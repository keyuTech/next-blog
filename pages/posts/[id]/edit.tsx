import { Snackbar } from "@mui/material";
import { Post } from "@prisma/client";
import axios from "axios";
import { useForm } from "hooks/useForm";
import { withSessionSsr } from "lib/withSession";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { UserRes } from "pages/api/v1/users";
import { useEffect, useState } from "react";
import { SnackbarMessage } from "types";
import prisma from "../../../lib/prisma";

interface PostEditProps {
  id?: string;
  post: Post | null;
  user: UserRes;
}

const PostEdit: NextPage<PostEditProps> = (props: PostEditProps) => {
  const { id, post, user } = props;
  const router = useRouter();
  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(
    undefined
  );
  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);
  const handleClose = () => {
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };
  const handleCancelClick = () => {
    router.push({
      pathname: `/posts/${id}`,
    });
  };
  const { form } = useForm({
    options: {
      initFormData: { title: post?.title || "", content: post?.content || "" },
      fields: [
        { label: "标题", type: "text", key: "title" },
        { label: "内容", type: "textarea", key: "content" },
      ],
      buttons: [
        <button key={"submit"} className={"button mr-8"} type="submit">
          修改
        </button>,
        <span key={"cancel"} className={"button"} onClick={handleCancelClick}>
          取消
        </span>,
      ],
      submit: {
        request: (formData) =>
          axios.patch(`/api/v1/posts/${id}`, { ...formData, id }),
        success: () => {
          setSnackPack((prev) => [
            ...prev,
            { message: "修改成功", key: new Date().getTime() },
          ]);
          setTimeout(() => {
            router.push({
              pathname: `/posts/${id}`,
            });
          }, 3000);
        },
      },
    },
  });
  return (
    <div className={"container mx-auto p-4 md:p-16"}>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
        message={messageInfo ? messageInfo.message : undefined}
      />
      {form}
    </div>
  );
};

export default PostEdit;

export const getServerSideProps: GetServerSideProps<
  PostEditProps,
  { id: string }
> = withSessionSsr(async (context) => {
  const id = context.params?.id?.toString() || null;
  const post = id
    ? await prisma?.post.findUnique({ where: { id: parseInt(id) } })
    : null;
  const user = context.req.session.user || null;

  return {
    props: {
      id: JSON.parse(JSON.stringify(id)),
      post: JSON.parse(JSON.stringify(post)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
});

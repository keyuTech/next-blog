import { NextPage } from "next";
import { useForm } from "hooks/useForm";
import axios from "axios";
import { useRouter } from "next/router";
import "easymde/dist/easymde.min.css";
import Link from "next/link";
import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { SnackbarMessage } from "types";

const PostsNew: NextPage = (props) => {
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
  const { form } = useForm({
    options: {
      initFormData: { title: "", content: "" },
      fields: [
        { label: "标题", type: "text", key: "title" },
        { label: "内容", type: "textarea", key: "content" },
      ],
      buttons: [
        <button
          className={"border border-stone-900 py-2 px-3"}
          key={"submit"}
          type="submit"
        >
          提交
        </button>,
      ],
      submit: {
        request: (formData) => axios.post(`/api/v1/posts`, formData),
        success: () => {
          setSnackPack((prev) => [
            ...prev,
            { message: "提交成功", key: new Date().getTime() },
          ]);
          setTimeout(() => {
            router.push({
              pathname: "/posts",
              query: { page: 1 },
            });
          }, 3000);
        },
      },
    },
  });
  return (
    <div className={"container mx-auto p-16"}>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
        message={messageInfo ? messageInfo.message : undefined}
      />
      <div className={"flex justify-between"}>
        <Link href={"/posts"}>
          <a className={"link-button hover:text-blue-500"}>返回列表</a>
        </Link>
      </div>
      {form}
    </div>
  );
};

export default PostsNew;

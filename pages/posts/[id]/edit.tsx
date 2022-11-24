import { Post } from "@prisma/client";
import axios from "axios";
import { useForm } from "hooks/useForm";
import { withSessionSsr } from "lib/withSession";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { UserRes } from "pages/api/v1/users";

interface PostEditProps {
  id?: string;
  post: Post | null;
  user: UserRes;
}

const PostEdit: NextPage<PostEditProps> = (props: PostEditProps) => {
  const { id, post, user } = props;
  const router = useRouter();
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
        <button
          key={"submit"}
          className={"button mr-8"}
          type="submit"
        >
          修改
        </button>,
        <span
          key={"cancel"}
          className={"button"}
          onClick={handleCancelClick}
        >
          取消
        </span>,
      ],
      submit: {
        request: (formData) =>
          axios.patch(`/api/v1/posts/${id}`, { ...formData, id }),
        success: () => {
          window.alert("修改成功");
          router.push({
            pathname: `/posts/${id}`,
          });
        },
      },
    },
  });
  return <div className={"container mx-auto p-16"}>{form}</div>;
};

export default PostEdit;

export const getServerSideProps: GetServerSideProps<
  PostEditProps,
  { id: string }
> = withSessionSsr(async (context) => {
  const id = context.params?.id?.toString();
  const post = id
    ? await prisma?.post.findUnique({ where: { id: parseInt(id) } })
    : null;
  const user = context.req.session.user;

  return {
    props: {
      id,
      post: JSON.parse(JSON.stringify(post)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
});

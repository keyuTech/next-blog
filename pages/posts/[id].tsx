import { Alert, Snackbar } from "@mui/material";
import { Post } from "@prisma/client";
import axios from "axios";
import { withSessionSsr } from "lib/withSession";
import { marked } from "marked";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserRes } from "pages/api/v1/users";
import { useCallback, useState } from "react";
import prisma from "../../lib/prisma";

interface PostProps {
  post?: Post | null;
  user?: UserRes;
}

const PostDetail: NextPage = (props: PostProps) => {
  const router = useRouter();
  const { post, user } = props;
  const html = marked.parse(post?.content || "");
  const [success, setSuccess] = useState<boolean>(false)

  const handleDeleteClick = useCallback(() => {
    if (user) {
      axios.delete(`/api/v1/posts/${post?.id}`).then(
        () => {
          setSuccess(true)
          router.push({
            pathname: "/posts",
          });
        },
        (error) => {

        }
      );
    } else {
      router.push({
        pathname: "/sign_in",
      });
    }
  }, [post, user, router]);

  const handleEditClick = useCallback(() => {
    if (user) {
      if (user.id === post?.author_id) {
        router.push({
          pathname: `/posts/${post?.id}/edit`,
        });
      } else {
        <Alert severity="error">无权修改他人文章</Alert>;
      }
    } else {
      router.push({
        pathname: "/sign_in",
      });
    }
  }, [post, user, router]);

  return (
    <div className={"container p-16 mx-auto"}>
      <Snackbar open={success} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          删除成功
        </Alert>
      </Snackbar>
      <div className={"flex justify-between"}>
        <Link href={"/posts"}>
          <a className={"link-button hover:text-blue-500"}>返回列表</a>
        </Link>
        <div>
          <span
            className={"link-button mr-8 hover:text-blue-500"}
            onClick={handleEditClick}
          >
            编辑
          </span>
          <span
            className={"link-button hover:text-red-500"}
            onClick={handleDeleteClick}
          >
            删除
          </span>
        </div>
      </div>
      <h2 className={"text-5xl font-bold py-8"}>{post?.title}</h2>
      <article
        className={"markdown-body"}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default PostDetail;

export const getServerSideProps: GetServerSideProps<PostProps, { id: string }> =
  withSessionSsr(async (context) => {
    const post = context.params?.id
      ? await prisma?.post.findUnique({
          where: { id: parseInt(context.params.id.toString()) },
        })
      : null;

    const user = context.req.session.user || null;

    return {
      props: {
        post: JSON.parse(JSON.stringify(post)),
        user: JSON.parse(JSON.stringify(user)),
      },
    };
  });

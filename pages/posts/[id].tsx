import { Post } from "@prisma/client";
import { marked } from "marked";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import prisma from "../../lib/prisma";

interface PostProps {
  post?: Post | null;
}

const PostDetail: NextPage = (props: PostProps) => {
  const { post } = props;
  const html = marked.parse(post?.content || "");

  return (
    <div className={"container px-16 py-16 mx-auto"}>
      <div className={'flex justify-between'}>
        <Link href={'/posts'}>
          <span className={'link-button hover:text-blue-500'}>返回列表</span>
        </Link>
        <div>
          <Link href={`/posts/${post?.id}/edit`}>
            <span className={'link-button mr-8 hover:text-blue-500'}>编辑</span>
          </Link>
          <span className={'link-button hover:text-red-500'}>删除</span>
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

export const getServerSideProps: GetServerSideProps<
  PostProps,
  { id: string }
> = async (context) => {
  const post = context.params?.id
    ? await prisma?.post.findUnique({
        where: { id: parseInt(context.params.id) },
      })
    : null;

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
};

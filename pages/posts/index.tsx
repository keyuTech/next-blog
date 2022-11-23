import { GetServerSideProps, NextPage } from "next";
import prisma from "lib/prisma";
import { Post } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  posts: Post[];
  total: number;
}

const PostsIndex: NextPage<Props> = (props) => {
  const { posts, total } = props;
  const router = useRouter();
  const page = parseInt((router.query.page || "1").toString());

  return (
    <div className={"container mx-auto my-16 px-16 h-full"}>
      <h1 className={"mb-4 flex justify-between items-center"}>
        <span className={"text-3xl font-bold"}>文章列表</span>
        <Link href={"/posts/new"}><a className={'border border-stone-900 py-2 px-3'}>新建文章</a></Link>
      </h1>

      {posts.map((post) => (
        <Link key={`${post.id}-${post.author_id}`} href={`/posts/${post.id}`}>
          <div className={"mb-4"}>
            <h3 className={"text-2xl font-bold"}>{post.title}</h3>
            <article>{post.content.substring(0, 50)}</article>
          </div>
        </Link>
      ))}
      <footer className={"mt-16"}>
        <div>
          共{total}项, 当前第{page}页
        </div>
        {page > 1 && (
          <>
            <Link href={`?page=${page - 1}`}>上一页</Link> |
          </>
        )}
        {page * 2 < total && <Link href={`?page=${page + 1}`}>下一页</Link>}
      </footer>
    </div>
  );
};

export default PostsIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = parseInt(context.query.page?.toString() || "1") || 1;
  const [posts, total] = await prisma.$transaction([
    prisma.post.findMany({ skip: (page - 1) * 2, take: 2 }),
    prisma.post.count(),
  ]);
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      total,
    },
  };
};

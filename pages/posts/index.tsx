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
    <div>
      <h1 className={"text-3xl font-bold mb-4"}>文章列表</h1>
      {posts.map((post) => (
        <Link key={`${post.id}-${post.author_id}`} href={`/posts/${post.id}`}>
          <div className={"mb-4"}>
            <h3 className={"text-2xl"}>{post.title}</h3>
            <article>{post.content}</article>
          </div>
        </Link>
      ))}
      <footer>
        <div>
          共{total}项, 当前第{page}页
        </div>
        {page > 1 && <>
          <Link href={`?page=${page - 1}`}>上一页</Link> |
        </>}
        {page*2 < total && <Link href={`?page=${page + 1}`}>下一页</Link>}
      </footer>
    </div>
  );
};

export default PostsIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = parseInt(context.query.page?.toString() || "1");
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

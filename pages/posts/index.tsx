import { GetServerSideProps, NextPage } from "next";
import prisma from "lib/prisma";
import { Post } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { withSessionSsr } from "lib/withSession";
import { UserRes } from "pages/api/v1/users";

interface Props {
  posts: Post[];
  total: number;
  user: UserRes
}

const PostsIndex: NextPage<Props> = (props) => {
  const { posts, total, user } = props;
  const router = useRouter();
  const page = parseInt((router.query.page || "1").toString());
  console.log('user');
  console.log(user);
  

  const handleCreateClick = () => {
    if (!user) {
      router.push({
        pathname: "/sign_in",
        query: { return_to: encodeURIComponent('/posts/new') },
      });
    } else {
      router.push({
        pathname: '/posts/new'
      })
    }
  }

  return (
    <div className={"container mx-auto p-16 h-full"}>
      <h1 className={"mb-8 flex justify-between items-center"}>
        <span className={"text-3xl font-bold"}>文章列表</span>
        <span className={'border border-stone-900 py-2 px-3'} onClick={handleCreateClick}>新建文章</span>
      </h1>

      {posts.map((post) => (
        <Link key={`${post.id}-${post.author_id}`} href={`/posts/${post.id}`}>
          <div className={"mb-4"}>
            <h3 className={"post-title"}>{post.title}</h3>
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

export const getServerSideProps: GetServerSideProps = withSessionSsr(async (context) => {
  const page = parseInt(context.query.page?.toString() || "1") || 1;
  const [posts, total] = await prisma.$transaction([
    prisma.post.findMany({ skip: (page - 1) * 2, take: 2, orderBy: {created_at: 'desc'} }),
    prisma.post.count(),
  ]);
  const user = context.req.session.user
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      total,
      user: JSON.parse(JSON.stringify(user))
    },
  };
})

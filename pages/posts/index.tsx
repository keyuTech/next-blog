import { GetServerSideProps, NextPage } from "next";
import prisma from "lib/prisma";
import { Post } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { withSessionSsr } from "lib/withSession";
import { UserRes } from "pages/api/v1/users";
import { marked } from "marked";

interface Props {
  posts: Post[];
  total: number;
  user: UserRes;
}

const PostsIndex: NextPage<Props> = (props) => {
  const { posts, total, user } = props;
  const router = useRouter();
  const page = parseInt((router.query.page || "1").toString());

  const handleCreateClick = () => {
    if (!user) {
      router.push({
        pathname: "/sign_in",
        query: { return_to: encodeURIComponent("/posts/new") },
      });
    } else {
      router.push({
        pathname: "/posts/new",
      });
    }
  };

  const handlePostClick = (post: Post) => {
    router.push({
      pathname: `/posts/${post.id}`,
    });
  };

  return (
    <div className={"container mx-auto p-8 md:p-16 h-full"}>
      <h1 className={"mb-8 flex justify-between items-center"}>
        <span className={"text-3xl font-bold"}>文章列表</span>
        <span className={"button"} onClick={handleCreateClick}>
          写文章
        </span>
      </h1>

      {posts.map((post) => (
        <div
          key={`${post.id}-${post.author_id}`}
          onClick={(e) => {
            e.stopPropagation();
            handlePostClick(post);
          }}
          className={"mb-8 cursor-pointer"}
        >
          <h3 className={"post-title overflow-hidden text-ellipsis"}>{post.title}</h3>
          <article
            className={"artical-summary line-clamp-4 max-h-[120px]"}
            dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }}
          />
        </div>
      ))}
      <footer className={"py-16"}>
        <div className={"mb-4"}>
          共{total}项, 共{Math.ceil(total / 10)}页, 当前第{page}页
        </div>
        {page > 1 && (
          <Link href={`?page=${page - 1}`}>
            <a className={"button mr-8"}>上一页</a>
          </Link>
        )}
        {page * 10 <= total && (
          <Link href={`?page=${page + 1}`}>
            <a className={"button"}>下一页</a>
          </Link>
        )}
      </footer>
    </div>
  );
};

export default PostsIndex;

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async (context) => {
    const page = parseInt(context.query.page?.toString() || "1") || 1;
    const [posts, total] = await prisma.$transaction([
      prisma.post.findMany({
        skip: (page - 1) * 10,
        take: 10,
        orderBy: { created_at: "desc" },
      }),
      prisma.post.count(),
    ]);
    const user = context.req.session.user || null;
    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts || null)),
        total: JSON.parse(JSON.stringify(total || null)),
        user: JSON.parse(JSON.stringify(user)),
      },
    };
  }
);

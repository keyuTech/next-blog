import { Post } from "@prisma/client";
import { marked } from "marked";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import prisma from "../lib/prisma";

interface HomeProps {
  posts: Post[];
}

const Home: NextPage<HomeProps> = (props) => {
  const { posts } = props;
  return (
    <div className={"home h-full w-full"}>
      <div className={"container mx-auto p-16"}>
        <Link href={"/posts"}>
          <a className={"text-3xl font-bold mb-8 inline-block"}>文章列表</a>
        </Link>

        {posts.map((post) => (
          <div key={post.id} className={"mb-8"}>
            <Link href={`/posts/${post.id}`}>
              <a className={"block cursor-pointer"}>
                <p className={"post-title"}>{post.title}</p>
                <article
                  className={"artical-summary"}
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(post.content),
                  }}
                />
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await prisma.post.findMany({
    take: 10,
    orderBy: { created_at: "desc" },
  });
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};

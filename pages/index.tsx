import { Post } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import prisma from "../lib/prisma";

interface HomeProps {
  posts: Post[];
}

const Home: NextPage<HomeProps> = (props) => {
  const { posts } = props;
  return (
    <div
      className={"home h-full w-full"}
    >
      <div className={'container mx-auto px-16 py-16 border border-red-400'}>
        <Link href={"/posts"}><a className={'text-3xl font-bold'}>文章列表</a></Link>

        {posts.map((post) => (
          <div key={post.id} className={'mb-8 border border-red-300'}>
            <div>
              <p>{post.title}</p>
              <article>{post.content.substring(0, 50)}</article>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await prisma.post.findMany({ take: 10 });
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};

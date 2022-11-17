import { GetServerSideProps, NextPage } from "next";
import prisma from "lib/prisma";
import { Post } from "@prisma/client";
import Link from "next/link";

interface Props {
  posts: Post[];
}

const PostsIndex: NextPage<Props> = (props) => {
  const { posts } = props;

  return (
    <div>
      {posts.map((post) => (
        <Link key={`${post.id}-${post.author_id}`} href={`/posts/${post.id}`}>
          <div className={"mb-4"}>
            <h3 className={"text-2xl"}>{post.title}</h3>
            <article>{post.content}</article>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostsIndex;

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await prisma.post.findMany();
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};

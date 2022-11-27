import { Post } from "@prisma/client";
import { marked } from "marked";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import prisma from "../lib/prisma";

interface HomeProps {
  posts: Post[];
}

const Home: NextPage<HomeProps> = (props) => {
  const { posts } = props;
  const router = useRouter();
  const handlePostClick = (post: Post) => {
    router.push({
      pathname: `/posts/${post.id}`,
    });
  };

  const renderCard = (post: Post) => {
    return (
      <div
        className={"card mb-8 cursor-pointer"}
        key={post.id}
        onClick={() => handlePostClick(post)}
      >
        <img
          src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
        />
        <h4 className={"post-title"}>{post.title}</h4>
        <div className={"content-wrapper"}>
          <div className={"content"}>
            <article
              className={"artical-summary"}
              dangerouslySetInnerHTML={{
                __html: marked.parse(post.content),
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={"home h-full w-full"}>
      <div className={"container mx-auto p-16"}>
        <Link href={"/posts"}>
          <a className={"text-3xl font-bold mb-8 inline-block"}>文章列表</a>
        </Link>

        {posts.map((post) => renderCard(post))}
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
      posts: JSON.parse(JSON.stringify(posts || null)),
    },
  };
};

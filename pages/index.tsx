import { Modal } from '@mui/material';
import { Post } from '@prisma/client';
import { marked } from 'marked';
import moment from 'moment';
import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import prisma from '../lib/prisma';
import useParallax from '../hooks/useParallax';

interface HomeProps {
  posts: Post[];
}

const Home: NextPage<HomeProps> = (props) => {
  const {posts} = props;
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);
  const {parallax} = useParallax();

  const handlePostClick = (post: Post) => {
    setOpen(true);
    setSelectedPost(post);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleButtonClick = () => {
    router.push({
      pathname: `posts/${selectedPost?.id}`,
    });
  };

  const renderContent = (post: Post, type: 'article' | 'summary') => {
    return (
      <>
        <h4 className={'post-title w-full overflow-hidden whitespace-nowrap text-ellipsis'}>{post.title}</h4>
        <p className={'mb-4 opacity-40'}>{moment(new Date(post.created_at)).format('YYYY-MM-DD')}</p>
        <article
          className={`article-${type} ${type === 'summary' ? 'line-clamp-4 truncate' : ''} max-h-[120px] text-base`}
          dangerouslySetInnerHTML={{
            __html: marked.parse(post.content),
          }}
        />
      </>
    );
  };

  const renderCard = (post: Post) => {
    return (
      <div
        className={'card mb-8 cursor-pointer border border-stone-300 rounded-xl w-full md:w-[calc(50%-1rem)] p-4 hover:shadow-lg'}
        key={post.id}
        onClick={() => handlePostClick(post)}
      >
        {renderContent(post, 'summary')}
      </div>
    );
  };

  return (
    <div className={'home h-full w-full'}>
      {parallax}
      <div className={'container mx-auto p-4 md:py-12 md:max-w-7xl'}>
        <Link href={'/posts'}>
          <a className={'text-3xl font-bold mb-8 inline-block hover:text-active-text'}>
            {'前往文章列表 ->'}
          </a>
        </Link>
        <div className={'flex flex-wrap justify-between'}>
          {posts.map((post) => renderCard(post))}
        </div>
      </div>
      <Modal open={open} onClose={handleModalClose}>
        {selectedPost ? (
          <div className={'bg-white h-full py-12 px-4 md:p-16 md:m-16 md:h-[calc(100%-8rem)]'}>
            <div className={'overflow-y-auto overflow-x-hidden break-words h-full w-full p-4'}>
              <div className={'flex justify-between'}>
                <span
                  className={
                    'button hover:text-active-text mb-4 font-bold'
                  }
                  onClick={handleButtonClick}
                >
                  前往文章
                </span>

                <span
                  className={'text-4xl cursor-pointer'}
                  onClick={handleModalClose}
                >
                  X
                </span>
              </div>
              {renderContent(selectedPost, 'article')}
            </div>
          </div>
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await prisma.post.findMany({
    take: 10,
    orderBy: {created_at: 'desc'},
  });
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts || null)),
    },
  };
};


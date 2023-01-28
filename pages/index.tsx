import { Modal } from '@mui/material';
import { Post } from '@prisma/client';
import { marked } from 'marked';
import moment from 'moment';
import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import prisma from '../lib/prisma';
import hill1 from '../public/images/hill1.png';
import hill2 from '../public/images/hill2.png';
import hill3 from '../public/images/hill3.png';
import hill4 from '../public/images/hill4.png';
import hill5 from '../public/images/hill5.png';
import leaf from '../public/images/leaf.png';
import plant from '../public/images/plant.png';
import tree from '../public/images/tree.png';

interface HomeProps {
  posts: Post[];
}

const Home: NextPage<HomeProps> = (props) => {
  const {posts} = props;
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const value = window.scrollY;
      console.log(value);
      setOffset(value > 0 ? value : 0);
    };
    window.removeEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll, {capture: true, passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);

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
      <section className={'parallax relative flex justify-center items-center aspect-video overflow-hidden'}>
        <img src={hill1.src} className={'hill1'} style={{top: offset * 0.5 + 'px'}}/>
        <img src={hill2.src} className={'hill2'}/>
        <img src={hill3.src} className={'hill3'}/>
        <img src={hill4.src} className={'hill4'} style={{left: offset * -1.5 + 'px'}}/>
        <img src={hill5.src} className={'hill5'} style={{left: offset * 1.5 + 'px'}}/>
        <img src={tree.src} className={'tree'}/>
        <h2 className={'text absolute text-3xl md:text-5xl lg:text-7xl text-white font-semibold z-50'} style={{marginTop: offset * 1.5 + 'px'}}>
          {`Keyu's Website`}
        </h2>
        <img src={leaf.src} className={'leaf'} style={{top: offset * -1.5 + 'px', left: offset * 1.5 + 'px'}}/>
        <img src={plant.src} className={'plant'}/>
      </section>
      <div className={'container mx-auto p-4 md:py-12 md:max-w-7xl'}>
        <Link href={'/posts'}>
          <a className={'text-3xl font-bold mb-8 inline-block'}>
            {'全部文章 ->'}
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
                    'button hover:text-blue-500 hover:border-blue-500 mb-4'
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


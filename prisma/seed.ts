import prisma from '../lib/prisma'

const main = async () => {
  const user1 = await prisma.user.upsert({
    where: {id: 1},
    create: {
      username: 'user1',
      password_digest: 'aaa'
    },
    update: {
      username: 'user1',
      password_digest: 'aaa'
    }
  });
  console.log('upsert user');
  const post1 = await prisma.post.upsert({
    where: {id: 1},
    create: {
      title: 'First post',
      content: 'My first post',
      author: {
        connect: {id: 1}
      },
      comments: {}
    },
    update: {}
  })
  console.log('upsert post');
  const comment1 = await prisma.comment.upsert({
    where: {id:1},
    create: {
      content: 'comment 1',
      author: {
        connect: {id: 1}
      },
      post: {
        connect: {id: 1}
      }
    },
    update: {}
  })
  console.log('upsert comment');
};

main().catch((e) => {
  console.log(e);
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})

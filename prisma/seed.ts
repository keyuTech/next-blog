import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const main = async () => {
  const user1 = await prisma.user.upsert({
    where: {id: 1},
    create: {
      username: 'user1',
      password_digest: 'aaa'
    },
    update: {}
  });
  console.log('create user');
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
  const comment1 = await prisma.comment.create({
    data: {
      content: 'comment 1',
      author: {
        connect: {id: 1}
      },
      post: {
        connect: {id: 1}
      }
    }
  })
};

main().catch((e) => {
  console.log(e);
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})

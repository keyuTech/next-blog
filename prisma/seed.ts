import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const main = async () => {
  const kkk = await prisma.user.upsert({
    where: {id: 1},
    create: {
      username: 'kkkk',
      password_digest: 'aaa'
    },
    update: {}
  });
  console.log('create user');
};

main().catch((e) => {
  console.log(e);
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})

import { PrismaClient } from './client';

const prisma = new PrismaClient();
const main = async () => {
  const kkk = prisma.user.upsert({
    where: {id: 1},
    update: {
      username: 'kkk',
      password_digest: 'aaa'
    },
    create: {
      username: 'kkk',
      password_digest: 'aaa'
    }
  });
};
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

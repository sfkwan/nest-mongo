import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: 'Rick',
      email: 'rick@prisma.com',
      address: {
        street: '39 Yuet Wah Street',
        city: 'Kowloon',
      },
      post: {
        create: {
          title: 'My first post',
          body: 'Lots of really interesting stuff',
          slug: 'my-first-post',
        },
      },
    },
  });

  const allUsers = await prisma.user.findMany({ include: { post: true } });
  console.dir(allUsers, { depth: null });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

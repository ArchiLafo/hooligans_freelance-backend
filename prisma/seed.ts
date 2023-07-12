import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  // const passwordKirill = await bcrypt.hash('password-kirill', roundsOfHashing);
  // const passwordSlava = await bcrypt.hash('password-slava', roundsOfHashing);

  // const user1 = await prisma.user.upsert({
  //   where: { email: 'kirill@google.com' },
  //   update: {
  //     password: passwordKirill,
  //   },
  //   create: {
  //     email: 'kirill@google.com',
  //     name: 'Кирилл Ручин',
  //     password: passwordKirill,
  //   },
  // });

  // const user2 = await prisma.user.upsert({
  //   where: { email: 'slava@google.com' },
  //   update: {
  //     password: passwordSlava,
  //   },
  //   create: {
  //     email: 'slava@google.com',
  //     name: 'Вячеслав Прошин',
  //     password: passwordSlava,
  //   },
  // });

  // console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

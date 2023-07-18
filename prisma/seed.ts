import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main() {
  const passworAdmin = await bcrypt.hash('admin@admin.com', roundsOfHashing);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {
      password: passworAdmin,
    },
    create: {
      email: 'admin@admin.com',
      name: 'Admin',
      password: passworAdmin,
      role: Role.Admin,
    },
  });

  const copywriting = await prisma.category.upsert({
    where: { label: 'Копирайтинг' },
    update: {},
    create: {
      name: 'Copywriting',
      label: 'Копирайтинг',
      description: 'Создание продающих текстов и контента. Уникальные и убедительные сообщения для продвижения продуктов и услуг.',
    },
  });

  const webdesign = await prisma.category.upsert({
    where: { label: 'Веб-дизайн' },
    update: {},
    create: {
      name: 'Webdesign',
      label: 'Веб-дизайн',
      description: 'Создание привлекательных и интуитивно понятных веб-сайтов с учетом пользовательского опыта и эстетики.',
    },
  });

  const translation = await prisma.category.upsert({
    where: { label: 'Перевод' },
    update: {},
    create: {
      name: 'Translation',
      label: 'Перевод',
      description: 'Перевод текстов на разные языки с сохранением смысла и стиля оригинала.',
    },
  });

  const illustrations = await prisma.category.upsert({
    where: { label: 'Иллюстрации' },
    update: {},
    create: {
      name: 'Illustrations',
      label: 'Иллюстрации',
      description: 'Создание качественных и оригинальных иллюстраций для использования в различных медиа-проектах.',
    },
  });

  const mobiledevelopment = await prisma.category.upsert({
    where: { label: 'Мобильная разработка' },
    update: {},
    create: {
      name: 'Mobiledevelopment',
      label: 'Мобильная разработка',
      description: 'Разработка мобильных приложений для разных платформ, учитывая лучшие практики и современные технологии.',
    },
  });

  const photo = await prisma.category.upsert({
    where: { label: 'Фотография' },
    update: {},
    create: {
      name: 'Photo',
      label: 'Фотография',
      description: 'Создание профессиональных фотографий для разных целей, включая портреты, природу, события и продукты.',
    },
  });
  
  const other = await prisma.category.upsert({
    where: { label: 'Другое' },
    update: {},
    create: {
      name: 'Other',
      label: 'Другое',
      description: 'Дополнительные услуги, которые не попадают в другие категории, такие как видеомонтаж, анимация, консалтинг и т.д.',
    },
  });

  const bestProduct = await prisma.product.upsert({
    where: { id: 7 },
    update: {},
    create: {
      description: "Лучшая услуга, которой вы только можете воспользоваться.",
      cost: "100",
      title: "Лучшая услуга",
      places: "ул. Киренского, д. 26",
      categoryId: 7,
      authorId: 1,
      duration: "15 минут"
    },
  }); 

  const alsoBestProduct = await prisma.product.upsert({
    where: { id: 7 },
    update: {},
    create: {
      description: "Измененная, но все еще лучшая услуга, которой вы только можете воспользоваться.",
      cost: "300",
      title: "Теперь уж точно лучшая услуга",
      places: "ул. Академика Зелинского, д. 6",
      categoryId: 7,
      authorId: 1,
      duration: "2 часа"
    },
  }); 
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
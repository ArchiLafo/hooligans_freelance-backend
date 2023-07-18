import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const copywriting = await prisma.category.upsert({
    where: { title: 'Копирайтинг' },
    update: {},
    create: {
      title: 'Копирайтинг',
      description: 'Создание продающих текстов и контента. Уникальные и убедительные сообщения для продвижения продуктов и услуг.',
    },
  });

  const webdesign = await prisma.category.upsert({
    where: { title: 'Веб-дизайн' },
    update: {},
    create: {
      title: 'Веб-дизайн',
      description: 'Создание привлекательных и интуитивно понятных веб-сайтов с учетом пользовательского опыта и эстетики.',
    },
  });

  const translation = await prisma.category.upsert({
    where: { title: 'Перевод' },
    update: {},
    create: {
      title: 'Перевод',
      description: 'Перевод текстов на разные языки с сохранением смысла и стиля оригинала.',
    },
  });

  const illustrations = await prisma.category.upsert({
    where: { title: 'Иллюстрации' },
    update: {},
    create: {
      title: 'Иллюстрации',
      description: 'Создание качественных и оригинальных иллюстраций для использования в различных медиа-проектах.',
    },
  });

  const mobiledevelopment = await prisma.category.upsert({
    where: { title: 'Мобильная разработка' },
    update: {},
    create: {
      title: 'Мобильная разработка',
      description: 'Разработка мобильных приложений для разных платформ, учитывая лучшие практики и современные технологии.',
    },
  });

  const photo = await prisma.category.upsert({
    where: { title: 'Фотография' },
    update: {},
    create: {
      title: 'Фотография',
      description: 'Создание профессиональных фотографий для разных целей, включая портреты, природу, события и продукты.',
    },
  });
  
  const other = await prisma.category.upsert({
    where: { title: 'Другое' },
    update: {},
    create: {
      title: 'Другое',
      description: 'Дополнительные услуги, которые не попадают в другие категории, такие как видеомонтаж, анимация, консалтинг и т.д.',
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

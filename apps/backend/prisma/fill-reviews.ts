import { PrismaClient } from '@prisma/client';


export async function fillReviews(prisma: PrismaClient) {
  await prisma.review.upsert({
    where: { id: '7b229b70-f834-4c88-9414-467ad1d4c533' },
    update: {},
    create: {
      id: '7b229b70-f834-4c88-9414-467ad1d4c533',
      userId: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5442',
      trainingId: 'af430d39-5608-4815-9de9-ff43be0c6936',
      rating: 4,
      text: 'Эта тренировка для меня зарядка по утрам, помогает проснуться.',
      createdAt: new Date('2021-10-28'),
    }
  });

  await prisma.review.upsert({
    where: { id: '36364a3f-fe0d-4a41-a8d4-784177c2727e' },
    update: {},
    create: {
      id: '36364a3f-fe0d-4a41-a8d4-784177c2727e',
      userId: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5446',
      trainingId: 'af430d39-5608-4815-9de9-ff43be0c6936',
      rating: 5,
      text: 'Спасибо, классная тренировка! Понятная и интересная, с акцентом на правильную технику, как я люблю.',
      createdAt: new Date('2021-12-2'),
    }
  });

  await prisma.review.upsert({
    where: { id: '55e2f858-7384-4cc9-91eb-a54a2069531b' },
    update: {},
    create: {
      id: '55e2f858-7384-4cc9-91eb-a54a2069531b',
      userId: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5447',
      trainingId: 'af430d39-5608-4815-9de9-ff43be0c6936',
      rating: 5,
      text: 'Хорошая тренировка, но все же не хватило немного динамики. Для меня оказалась слишком легкой.',
      createdAt: new Date('2022-5-20'),
    }
  });

  await prisma.review.upsert({
    where: { id: '0aa7fb0a-6aa1-42df-9509-d399f2671db4' },
    update: {},
    create: {
      id: '0aa7fb0a-6aa1-42df-9509-d399f2671db4',
      userId: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5449',
      trainingId: 'af430d39-5608-4815-9de9-ff43be0c6936',
      rating: 5,
      text: 'Регулярно выполняю эту тренировку дома и вижу результат! Спина стала прямее, появилось больше сил и гибкость тоже стала лучше, хотя упражнения довольно простые.',
      createdAt: new Date('2023-9-14'),
    }
  });

  await prisma.review.upsert({
    where: { id: '8e000d16-5ded-4a7d-b101-df23d5a7cb3d' },
    update: {},
    create: {
      id: '8e000d16-5ded-4a7d-b101-df23d5a7cb3d',
      userId: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5450',
      trainingId: 'af430d39-5608-4815-9de9-ff43be0c6936',
      rating: 4,
      text: 'Ну какой же кайф! Спасибо, крутая программа. С музыкой вообще супер! Действительно, Energy!',
      createdAt: new Date('2023-10-17'),
    }
  });
}

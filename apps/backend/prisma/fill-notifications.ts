import { PrismaClient } from '@prisma/client';
import { users } from './constants';
import { getRandomDate } from '../src/utils/random';

export async function fillNotifications(prismaClient: PrismaClient) {
  await prismaClient.notification.upsert({
    where: {
      id: '9694b16d-af53-4cd0-b85c-c83b55862996'
    },
    update: {},
    create: {
      id: '9694b16d-af53-4cd0-b85c-c83b55862996',
      userId: users.MASHA.id,
      createdAt: getRandomDate(new Date('2023-7-1'), new Date('2023-10-1')),
      text: 'Привет, Мария! Приветствуем Вас на FitFriends — онлайн площадке для поиска тренировок.'
    }
  });

  await prismaClient.notification.upsert({
    where: {
      id: '367d442c-84e1-44cc-a38b-a5879771c52e'
    },
    update: {},
    create: {
      id: '367d442c-84e1-44cc-a38b-a5879771c52e',
      userId: users.MASHA.id,
      createdAt: getRandomDate(new Date('2023-7-1'), new Date('2023-10-1')),
      text: 'Черная пятница на FitFriends! Успейти оформить абонемент на тренировки по сниженным ценам!'
    }
  });

  await prismaClient.notification.upsert({
    where: {
      id: '8aea7731-18fb-427d-8204-500a21b2cb0c'
    },
    update: {},
    create: {
      id: '8aea7731-18fb-427d-8204-500a21b2cb0c',
      userId: users.MASHA.id,
      createdAt: getRandomDate(new Date('2023-7-1'), new Date('2023-10-1')),
      text: 'Скидки, скидки и снова скидки! Успейте записаться на тренировки пока мы не закрыли свой бизнес!'
    }
  });

  await prismaClient.notification.upsert({
    where: {
      id: 'e9df3096-462d-436e-a351-58a983eb0ad5'
    },
    update: {},
    create: {
      id: 'e9df3096-462d-436e-a351-58a983eb0ad5',
      userId: users.OLGA.id,
      createdAt: getRandomDate(new Date('2023-7-1'), new Date('2023-10-1')),
      text: 'Привет, Ольга! Приветствуем Вас на FitFriends — онлайн площадке для поиска тренировок.'
    }
  });

  await prismaClient.notification.upsert({
    where: {
      id: 'b527fb4c-068f-408b-9b0f-a697d0eab3d9'
    },
    update: {},
    create: {
      id: 'b527fb4c-068f-408b-9b0f-a697d0eab3d9',
      userId: users.OLGA.id,
      createdAt: getRandomDate(new Date('2023-7-1'), new Date('2023-10-1')),
      text: 'Черная пятница на FitFriends! Успейти оформить абонемент на тренировки по сниженным ценам!'
    }
  });
}

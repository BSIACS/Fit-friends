import { PrismaClient } from '@prisma/client';
import { LocationEnum } from '../src/types/location.enum';
import { UserRoleEnum } from '../src/types/user-role.enum';
import { TrainingLevelEnum } from '../src/types/training-level.enum';
import { PurchaseTypeEnum } from '../src/types/purchase-type.enum';
import { TrainingTypeEnum } from '../src/types/training-type.enum';
import { PaymentMethodEnum } from '../src/types/payment-method.enum';
import { TrainingDurationEnum } from '../src/types/training-duration.enum';
import { SexEnum } from '../src/types/sex.enum';
import { getRandomDate } from '../src/utils/random';
import { setPasswordHash } from '../src/utils/password.util';


const prisma = new PrismaClient();

async function fillDb() {
  await fillUsers();
  await fillTrainers();
  await fillTrainings();
  await fillPurchases();

  console.info('🤘️ Database was filled');
}

async function fillUsers() {
  const passwordHash = await setPasswordHash('testpass');

  await prisma.user.upsert({
    where: { id: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5442' },
    update: {},
    create: {
      id: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5442',
      name: 'Маша',
      email: 'masha@somemail.com',
      avatarSrc: 'photo-4.png',
      passwordHash: passwordHash,
      sex: SexEnum.FEMALE,
      birthDate: getRandomDate(new Date('1975-1-1'), new Date('2005-1-1')),
      role: UserRoleEnum.USER,
      description: 'Привет! Обожаю спорт и все, что с ним связанно. Регулярно хожу на тренировки по кроссфиту, также занимаюсь йогой, рястяжкой и боксом.',
      location: LocationEnum.PETROGRADSKAYA,
      backgroundImageSrc: '',
      createdAt: getRandomDate(new Date('2020-1-1'), new Date('2023-10-1')),
      trainingLevel: TrainingLevelEnum.AMATEUR,
      trainingType: [TrainingTypeEnum.YOGA, TrainingTypeEnum.RUNNING, TrainingTypeEnum.BOX],
      trainingDuration: TrainingDurationEnum.FIFTY_EIGHTY,
      calories: 1000,
      caloriesPerDay: 1000,
      isReadyForTraining: true,
    }
  });

  await prisma.user.upsert({
    where: { id: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5446' },
    update: {},
    create: {
      id: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5446',
      name: 'Ярослав',
      email: 'yaroslav@somemail.com',
      avatarSrc: 'photo-1.png',
      passwordHash: passwordHash,
      sex: SexEnum.MALE,
      birthDate: getRandomDate(new Date('1975-1-1'), new Date('2005-1-1')),
      role: UserRoleEnum.USER,
      description: 'Привет! Обожаю спорт и все, что с ним связанно. Регулярно хожу на тренировки по кроссфиту, также занимаюсь йогой, рястяжкой и боксом.',
      location: LocationEnum.PETROGRADSKAYA,
      backgroundImageSrc: '',
      createdAt: getRandomDate(new Date('2020-1-1'), new Date('2023-10-1')),
      trainingLevel: TrainingLevelEnum.AMATEUR,
      trainingType: [TrainingTypeEnum.YOGA, TrainingTypeEnum.RUNNING, TrainingTypeEnum.BOX],
      trainingDuration: TrainingDurationEnum.FIFTY_EIGHTY,
      calories: 1000,
      caloriesPerDay: 1000,
      isReadyForTraining: true,
    }
  });

  await prisma.user.upsert({
    where: { id: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5447' },
    update: {},
    create: {
      id: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5447',
      name: 'Сергей',
      email: 'sergey@somemail.com',
      avatarSrc: 'photo-1.png',
      passwordHash: passwordHash,
      sex: SexEnum.MALE,
      birthDate: getRandomDate(new Date('1975-1-1'), new Date('2005-1-1')),
      role: UserRoleEnum.USER,
      description: 'Привет! Обожаю спорт и все, что с ним связанно. Регулярно хожу на тренировки по кроссфиту, также занимаюсь йогой, рястяжкой и боксом.',
      location: LocationEnum.PETROGRADSKAYA,
      backgroundImageSrc: '',
      createdAt: getRandomDate(new Date('2020-1-1'), new Date('2023-10-1')),
      trainingLevel: TrainingLevelEnum.AMATEUR,
      trainingType: [TrainingTypeEnum.YOGA, TrainingTypeEnum.RUNNING, TrainingTypeEnum.BOX],
      trainingDuration: TrainingDurationEnum.FIFTY_EIGHTY,
      calories: 1000,
      caloriesPerDay: 1000,
      isReadyForTraining: true,
    }
  });

  await prisma.user.upsert({
    where: { id: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5449' },
    update: {},
    create: {
      id: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5449',
      name: 'Анна',
      email: 'anna@somemail.com',
      avatarSrc: 'photo-2.png',
      passwordHash: passwordHash,
      sex: SexEnum.FEMALE,
      birthDate: getRandomDate(new Date('1975-1-1'), new Date('2005-1-1')),
      role: UserRoleEnum.USER,
      description: 'Привет! Обожаю спорт и все, что с ним связанно. Регулярно хожу на тренировки по кроссфиту, также занимаюсь йогой, рястяжкой и боксом.',
      location: LocationEnum.PETROGRADSKAYA,
      backgroundImageSrc: '',
      createdAt: getRandomDate(new Date('2020-1-1'), new Date('2023-10-1')),
      trainingLevel: TrainingLevelEnum.AMATEUR,
      trainingType: [TrainingTypeEnum.YOGA, TrainingTypeEnum.RUNNING, TrainingTypeEnum.BOX],
      trainingDuration: TrainingDurationEnum.FIFTY_EIGHTY,
      calories: 1000,
      caloriesPerDay: 1000,
      isReadyForTraining: true,
    }
  });

  await prisma.user.upsert({
    where: { id: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5450' },
    update: {},
    create: {
      id: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5450',
      name: 'Света',
      email: 'sveta@somemail.com',
      avatarSrc: 'photo-3.png',
      passwordHash: passwordHash,
      sex: SexEnum.FEMALE,
      birthDate: getRandomDate(new Date('1975-1-1'), new Date('2005-1-1')),
      role: UserRoleEnum.USER,
      description: 'Привет! Обожаю спорт и все, что с ним связанно. Регулярно хожу на тренировки по кроссфиту, также занимаюсь йогой, рястяжкой и боксом.',
      location: LocationEnum.PETROGRADSKAYA,
      backgroundImageSrc: '',
      createdAt: getRandomDate(new Date('2020-1-1'), new Date('2023-10-1')),
      trainingLevel: TrainingLevelEnum.AMATEUR,
      trainingType: [TrainingTypeEnum.YOGA, TrainingTypeEnum.RUNNING, TrainingTypeEnum.BOX],
      trainingDuration: TrainingDurationEnum.FIFTY_EIGHTY,
      calories: 1000,
      caloriesPerDay: 1000,
      isReadyForTraining: true,
    }
  });

  await prisma.user.upsert({
    where: { id: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5451' },
    update: {},
    create: {
      id: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5451',
      name: 'Ольга',
      email: 'olga@somemail.com',
      avatarSrc: 'photo-3.png',
      passwordHash: passwordHash,
      sex: SexEnum.FEMALE,
      birthDate: getRandomDate(new Date('1975-1-1'), new Date('2005-1-1')),
      role: UserRoleEnum.USER,
      description: 'Привет! Обожаю спорт и все, что с ним связанно. Регулярно хожу на тренировки по кроссфиту, также занимаюсь йогой, рястяжкой и боксом.',
      location: LocationEnum.PETROGRADSKAYA,
      backgroundImageSrc: '',
      createdAt: getRandomDate(new Date('2020-1-1'), new Date('2023-10-1')),
      trainingLevel: TrainingLevelEnum.AMATEUR,
      trainingType: [TrainingTypeEnum.YOGA, TrainingTypeEnum.RUNNING, TrainingTypeEnum.BOX],
      trainingDuration: TrainingDurationEnum.FIFTY_EIGHTY,
      calories: 1000,
      caloriesPerDay: 1000,
      isReadyForTraining: true,
    }
  });
}

async function fillTrainers() {
  const passwordHash = await setPasswordHash('testpass');

  await prisma.trainer.upsert({
    where: { id: '9584ad02-ed85-438e-aead-797fd55978d8' },
    update: {},
    create: {
      id: '9584ad02-ed85-438e-aead-797fd55978d8',
      name: 'Валерия',
      email: 'trainhardwithvalery@somemail.com',
      avatarSrc: 'img/content/avatars/coaches/photo-4.png',
      passwordHash: passwordHash,
      sex: SexEnum.FEMALE,
      birthDate: getRandomDate(new Date('1975-1-1'), new Date('2005-1-1')),
      role: UserRoleEnum.TRAINER,
      description: 'Привет! Меня зовут Иванова Валерия. Я профессиональный тренер по боксу. Не боюсь пробовать новое, также увлекаюсь кроссфитом, йогой и силовыми тренировками.',
      location: LocationEnum.PETROGRADSKAYA,
      backgroundImageSrc: '',
      createdAt: getRandomDate(new Date('2020-1-1'), new Date('2023-10-1')),
      trainingLevel: TrainingLevelEnum.AMATEUR,
      trainingType: [TrainingTypeEnum.YOGA, TrainingTypeEnum.RUNNING, TrainingTypeEnum.BOX],
      certificateSrc: '',
      merits: 'Персональный тренер и инструктор групповых программ с опытом  более 4х лет. Специализация: коррекция фигуры и осанки, снижение веса, восстановление после травм, пилатес.',
      isReadyForTraining: true,
    }
  });

  await prisma.trainer.upsert({
    where: { id: '6c81306f-beb0-495d-a044-4fc6a2209724' },
    update: {},
    create: {
      id: '6c81306f-beb0-495d-a044-4fc6a2209724',
      name: 'Ярослав',
      email: 'yaroslavthetrainer@somemail.com',
      avatarSrc: 'img/content/avatars/coaches/photo-1.png',
      passwordHash: passwordHash,
      sex: SexEnum.MALE,
      birthDate: getRandomDate(new Date('1975-1-1'), new Date('2005-1-1')),
      role: UserRoleEnum.TRAINER,
      description: 'Привет! Меня зовут Ярослав. Мастер спорта по боксу, кмс по рукопашному бою, кмс по кикбоксингу',
      location: LocationEnum.PETROGRADSKAYA,
      backgroundImageSrc: '',
      createdAt: getRandomDate(new Date('2020-1-1'), new Date('2023-10-1')),
      trainingLevel: TrainingLevelEnum.PROFESSIONAL,
      trainingType: [TrainingTypeEnum.BOX, TrainingTypeEnum.RUNNING, TrainingTypeEnum.CROSSFIT],
      certificateSrc: '',
      merits: 'Персональный тренер и инструктор групповых программ с опытом  более 10 лет.',
      isReadyForTraining: true,
    }
  });
}

async function fillTrainings() {
  await prisma.training.upsert({                                //1
    where: { id: 'af430d39-5608-4815-9de9-ff43be0c6936' },
    update: {},
    create: {
      id: 'af430d39-5608-4815-9de9-ff43be0c6936',
      name: '',
      backgroundImgSrc: '',
      trainingLevel: TrainingLevelEnum.BEGINNER,
      trainingType: TrainingTypeEnum.CROSSFIT,
      trainingDuration: TrainingDurationEnum.FIFTY_EIGHTY,
      price: 2400,
      calories: 2000,
      description: '',
      sex: SexEnum.NOT_STATED,
      videoDemoSrc: '',
      rating: 0,
      votesNumber: 0,
      trainingCreatorId: '9584ad02-ed85-438e-aead-797fd55978d8',
      isSpecial: false,
    }
  });

  await prisma.training.upsert({                                //2
    where: { id: '89847a26-07a0-458f-af2e-d173cc7e10c5' },
    update: {},
    create: {
      id: '89847a26-07a0-458f-af2e-d173cc7e10c5',
      name: '',
      backgroundImgSrc: '',
      trainingLevel: TrainingLevelEnum.BEGINNER,
      trainingType: TrainingTypeEnum.PILATES,
      trainingDuration: TrainingDurationEnum.FIFTY_EIGHTY,
      price: 2400,
      calories: 2000,
      description: '',
      sex: SexEnum.NOT_STATED,
      videoDemoSrc: '',
      rating: 0,
      votesNumber: 0,
      trainingCreatorId: '9584ad02-ed85-438e-aead-797fd55978d8',
      isSpecial: false,
    }
  });

  await prisma.training.upsert({                                //3
    where: { id: '18237a96-aac0-49af-9309-6b4e3f881109' },
    update: {},
    create: {
      id: '18237a96-aac0-49af-9309-6b4e3f881109',
      name: '',
      backgroundImgSrc: '',
      trainingLevel: TrainingLevelEnum.BEGINNER,
      trainingType: TrainingTypeEnum.YOGA,
      trainingDuration: TrainingDurationEnum.FIFTY_EIGHTY,
      price: 2400,
      calories: 2000,
      description: '',
      sex: SexEnum.NOT_STATED,
      videoDemoSrc: '',
      rating: 0,
      votesNumber: 0,
      trainingCreatorId: '9584ad02-ed85-438e-aead-797fd55978d8',
      isSpecial: false,
    }
  });

  await prisma.training.upsert({                                //4
    where: { id: '1fb236e2-019e-4c87-aa5c-5f7d230cb1bd' },
    update: {},
    create: {
      id: '1fb236e2-019e-4c87-aa5c-5f7d230cb1bd',
      name: '',
      backgroundImgSrc: '',
      trainingLevel: TrainingLevelEnum.AMATEUR,
      trainingType: TrainingTypeEnum.BOX,
      trainingDuration: TrainingDurationEnum.EIGHTY_HUNDRED,
      price: 3000,
      calories: 2500,
      description: '',
      sex: SexEnum.NOT_STATED,
      videoDemoSrc: '',
      rating: 0,
      votesNumber: 0,
      trainingCreatorId: '6c81306f-beb0-495d-a044-4fc6a2209724',
      isSpecial: false,
    }
  });

  await prisma.training.upsert({                                //5
    where: { id: 'a7119df3-c77a-4994-9621-739a7356b122' },
    update: {},
    create: {
      id: 'a7119df3-c77a-4994-9621-739a7356b122',
      name: '',
      backgroundImgSrc: '',
      trainingLevel: TrainingLevelEnum.AMATEUR,
      trainingType: TrainingTypeEnum.CROSSFIT,
      trainingDuration: TrainingDurationEnum.EIGHTY_HUNDRED,
      price: 3000,
      calories: 2900,
      description: '',
      sex: SexEnum.NOT_STATED,
      videoDemoSrc: '',
      rating: 0,
      votesNumber: 0,
      trainingCreatorId: '6c81306f-beb0-495d-a044-4fc6a2209724',
      isSpecial: false,
    }
  });
}

async function fillPurchases() {
  await prisma.purchase.upsert({                                //1 Маша
    where: { id: '7e2d0660-1b41-4596-9b0e-8f9250419181' },
    update: {},
    create: {
      id: '7e2d0660-1b41-4596-9b0e-8f9250419181',
      userId: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5442',
      purchaseType: PurchaseTypeEnum.SEASON_TICKET,
      trainingId: 'af430d39-5608-4815-9de9-ff43be0c6936',
      price: 2400,
      quantity: 3,
      totalPrice: 7200,
      paymentMethod: PaymentMethodEnum.MIR,
      createdAt: new Date(),
    }
  });

  await prisma.purchase.upsert({                                //2 Маша
    where: { id: 'cdbf4100-48d6-4f2b-a454-bbe1562510e6' },
    update: {},
    create: {
      id: 'cdbf4100-48d6-4f2b-a454-bbe1562510e6',
      userId: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5442',
      purchaseType: PurchaseTypeEnum.SEASON_TICKET,
      trainingId: '18237a96-aac0-49af-9309-6b4e3f881109',
      price: 2400,
      quantity: 1,
      totalPrice: 2400,
      paymentMethod: PaymentMethodEnum.MIR,
      createdAt: new Date(),
    }
  });

  await prisma.purchase.upsert({                                //3 Анна
    where: { id: '5bf23699-f84b-468b-9625-20bbabd1a620' },
    update: {},
    create: {
      id: '5bf23699-f84b-468b-9625-20bbabd1a620',
      userId: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5449',
      purchaseType: PurchaseTypeEnum.SEASON_TICKET,
      trainingId: '18237a96-aac0-49af-9309-6b4e3f881109',
      price: 2400,
      quantity: 2,
      totalPrice: 4800,
      paymentMethod: PaymentMethodEnum.MIR,
      createdAt: new Date(),
    }
  });

  await prisma.purchase.upsert({                                //4 Сергей
    where: { id: '1a0c1c96-88b2-41fa-961d-f8b1a13012cf' },
    update: {},
    create: {
      id: '1a0c1c96-88b2-41fa-961d-f8b1a13012cf',
      userId: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5447',
      purchaseType: PurchaseTypeEnum.SEASON_TICKET,
      trainingId: 'a7119df3-c77a-4994-9621-739a7356b122',
      price: 3000,
      quantity: 5,
      totalPrice: 12000,
      paymentMethod: PaymentMethodEnum.MIR,
      createdAt: new Date(),
    }
  });
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })

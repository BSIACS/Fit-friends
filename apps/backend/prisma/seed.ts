import { PrismaClient } from '@prisma/client';
import { LocationEnum } from '../src/types/location.enum';
import { UserRoleEnum } from '../src/types/user-role.enum';
import { TrainingLevelEnum } from '../src/types/training-level.enum';
import { TrainingTypeEnum } from '../src/types/training-type.enum';
import { TrainingDurationEnum } from '../src/types/training-duration.enum';
import { SexEnum } from '../src/types/sex.enum';
import { getRandomDate } from '../src/utils/random';


const prisma = new PrismaClient();

async function fillDb() {
  await fillUsers();
  await fillTrainers();
  await fillTrainings();

  console.info('🤘️ Database was filled');
}

async function fillUsers() {
  await prisma.user.upsert({
    where: { id: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5442' },
    update: {},
    create: {
      id: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5442',
      name: 'Маша',
      email: 'masha@somemail.com',
      avatarSrc: 'photo-4.png',
      passwordHash: '$2b$10$Ipf4gcUHWG743vw8BcJ/Muzr.1Z8KWp3mqhIZrIJqspnQ7AQCTsjC',
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
      name: 'Ярослав',
      email: 'yaroslav@somemail.com',
      avatarSrc: 'photo-1.png',
      passwordHash: '$2b$10$Ipf4gcUHWG743vw8BcJ/Muzr.1Z8KWp3mqhIZrIJqspnQ7AQCTsjC',
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
      name: 'Сергей',
      email: 'sergey@somemail.com',
      avatarSrc: 'photo-1.png',
      passwordHash: '$2b$10$Ipf4gcUHWG743vw8BcJ/Muzr.1Z8KWp3mqhIZrIJqspnQ7AQCTsjC',
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
      name: 'Анна',
      email: 'anna@somemail.com',
      avatarSrc: 'photo-2.png',
      passwordHash: '$2b$10$Ipf4gcUHWG743vw8BcJ/Muzr.1Z8KWp3mqhIZrIJqspnQ7AQCTsjC',
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
      name: 'Света',
      email: 'sveta@somemail.com',
      avatarSrc: 'photo-3.png',
      passwordHash: '$2b$10$Ipf4gcUHWG743vw8BcJ/Muzr.1Z8KWp3mqhIZrIJqspnQ7AQCTsjC',
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
      name: 'Ольга',
      email: 'olga@somemail.com',
      avatarSrc: 'photo-3.png',
      passwordHash: '$2b$10$Ipf4gcUHWG743vw8BcJ/Muzr.1Z8KWp3mqhIZrIJqspnQ7AQCTsjC',
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
  await prisma.trainer.upsert({
    where: { id: '9584ad02-ed85-438e-aead-797fd55978d8' },
    update: {},
    create: {
      id: '9584ad02-ed85-438e-aead-797fd55978d8',
      name: 'Валерия',
      email: 'trainhardwithvalery@somemail.com',
      avatarSrc: 'img/content/avatars/coaches/photo-4.png',
      passwordHash: '$2b$10$Ipf4gcUHWG743vw8BcJ/Muzr.1Z8KWp3mqhIZrIJqspnQ7AQCTsjC',
      sex: SexEnum.FEMALE,
      birthDate: getRandomDate(new Date('1975-1-1'), new Date('2005-1-1')),
      role: UserRoleEnum.USER,
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
}

async function fillTrainings() {
  await prisma.training.upsert({
    where: { id: 'af430d39-5608-4815-9de9-ff43be0c6936' },
    update: {},
    create: {
      name: '',
      backgroundImgSrc: '',
      trainingLevel: TrainingLevelEnum.AMATEUR,
      trainingType: TrainingTypeEnum.CROSSFIT,
      trainingDuration: TrainingDurationEnum.FIFTY_EIGHTY,
      price: 2400,
      calories: 2000,
      description: '',
      sex: SexEnum.NOT_STATED,
      videoDemoSrc: '',
      rating: 5,
      trainingCreatorId: '9584ad02-ed85-438e-aead-797fd55978d8',
      isSpecial: false,
    }
  })
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

import { PrismaClient } from '@prisma/client';
import { LocationEnum } from '../src/types/location.enum';
import { SexEnum } from '../src/types/sex.enum';
import { TrainingDurationEnum } from '../src/types/training-duration.enum';
import { TrainingLevelEnum } from '../src/types/training-level.enum';
import { TrainingTypeEnum } from '../src/types/training-type.enum';
import { UserRoleEnum } from '../src/types/user-role.enum';
import { setPasswordHash } from '../src/utils/password.util';
import { getRandomDate } from '../src/utils/random';

export async function fillUsers(prisma: PrismaClient) {
  const passwordHash = await setPasswordHash('testpass');

  await prisma.user.upsert({
    where: { id: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5442' },
    update: {},
    create: {
      id: '2bd0ea5f-7e5e-452f-8c7a-d83c00ca5442',
      name: 'Маша',
      email: 'masha@somemail.com',
      avatarFileName: '6851af72b91ec03fb28dbf495806b388',
      passwordHash: passwordHash,
      sex: SexEnum.FEMALE,
      birthDate: getRandomDate(new Date('1975-1-1'), new Date('2005-1-1')),
      role: UserRoleEnum.USER,
      description: 'Привет! Обожаю спорт и все, что с ним связанно. Регулярно хожу на тренировки по кроссфиту, также занимаюсь йогой, рястяжкой и боксом.',
      location: LocationEnum.PETROGRADSKAYA,
      backgroundImgFileName: 'cde12023aef07be50c95e9f5f6be1244',
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
      avatarFileName: '6851af72b91ec03fb28dbf495806b388',
      passwordHash: passwordHash,
      sex: SexEnum.MALE,
      birthDate: getRandomDate(new Date('1975-1-1'), new Date('2005-1-1')),
      role: UserRoleEnum.USER,
      description: 'Привет! Обожаю спорт и все, что с ним связанно. Регулярно хожу на тренировки по кроссфиту, также занимаюсь йогой, рястяжкой и боксом.',
      location: LocationEnum.PETROGRADSKAYA,
      backgroundImgFileName: 'cde12023aef07be50c95e9f5f6be1244',
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
      avatarFileName: '6851af72b91ec03fb28dbf495806b388',
      passwordHash: passwordHash,
      sex: SexEnum.MALE,
      birthDate: getRandomDate(new Date('1975-1-1'), new Date('2005-1-1')),
      role: UserRoleEnum.USER,
      description: 'Привет! Обожаю спорт и все, что с ним связанно. Регулярно хожу на тренировки по кроссфиту, также занимаюсь йогой, рястяжкой и боксом.',
      location: LocationEnum.PETROGRADSKAYA,
      backgroundImgFileName: 'cde12023aef07be50c95e9f5f6be1244',
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
      avatarFileName: '6851af72b91ec03fb28dbf495806b388',
      passwordHash: passwordHash,
      sex: SexEnum.FEMALE,
      birthDate: getRandomDate(new Date('1975-1-1'), new Date('2005-1-1')),
      role: UserRoleEnum.USER,
      description: 'Привет! Обожаю спорт и все, что с ним связанно. Регулярно хожу на тренировки по кроссфиту, также занимаюсь йогой, рястяжкой и боксом.',
      location: LocationEnum.PETROGRADSKAYA,
      backgroundImgFileName: 'cde12023aef07be50c95e9f5f6be1244',
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
      avatarFileName: '6851af72b91ec03fb28dbf495806b388',
      passwordHash: passwordHash,
      sex: SexEnum.FEMALE,
      birthDate: getRandomDate(new Date('1975-1-1'), new Date('2005-1-1')),
      role: UserRoleEnum.USER,
      description: 'Привет! Обожаю спорт и все, что с ним связанно. Регулярно хожу на тренировки по кроссфиту, также занимаюсь йогой, рястяжкой и боксом.',
      location: LocationEnum.PETROGRADSKAYA,
      backgroundImgFileName: 'cde12023aef07be50c95e9f5f6be1244',
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
      avatarFileName: '6851af72b91ec03fb28dbf495806b388',
      passwordHash: passwordHash,
      sex: SexEnum.FEMALE,
      birthDate: getRandomDate(new Date('1975-1-1'), new Date('2005-1-1')),
      role: UserRoleEnum.USER,
      description: 'Привет! Обожаю спорт и все, что с ним связанно. Регулярно хожу на тренировки по кроссфиту, также занимаюсь йогой, рястяжкой и боксом.',
      location: LocationEnum.PETROGRADSKAYA,
      backgroundImgFileName: 'cde12023aef07be50c95e9f5f6be1244',
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

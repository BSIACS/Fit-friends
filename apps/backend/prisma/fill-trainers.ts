import { PrismaClient } from '@prisma/client';
import { LocationEnum } from '../src/types/location.enum';
import { SexEnum } from '../src/types/sex.enum';
import { TrainingLevelEnum } from '../src/types/training-level.enum';
import { TrainingTypeEnum } from '../src/types/training-type.enum';
import { UserRoleEnum } from '../src/types/user-role.enum';
import { setPasswordHash } from '../src/utils/password.util';
import { getRandomDate } from '../src/utils/random';

export async function fillTrainers(prisma: PrismaClient) {
  const passwordHash = await setPasswordHash('testpass');

  await prisma.trainer.upsert({
    where: { id: '9584ad02-ed85-438e-aead-797fd55978d8' },
    update: {},
    create: {
      id: '9584ad02-ed85-438e-aead-797fd55978d8',
      name: 'Валерия',
      email: 'trainhardwithvalery@somemail.com',
      avatarFileName: 'photo-1.png',
      passwordHash: passwordHash,
      sex: SexEnum.FEMALE,
      birthDate: getRandomDate(new Date('1975-1-1'), new Date('2005-1-1')),
      role: UserRoleEnum.TRAINER,
      description: 'Привет! Меня зовут Иванова Валерия. Я профессиональный тренер по боксу. Не боюсь пробовать новое, также увлекаюсь кроссфитом, йогой и силовыми тренировками.',
      location: LocationEnum.PETROGRADSKAYA,
      backgroundImgFileName: 'cde12023aef07be50c95e9f5f6be1244',
      createdAt: getRandomDate(new Date('2020-1-1'), new Date('2023-10-1')),
      trainingLevel: TrainingLevelEnum.AMATEUR,
      trainingType: [TrainingTypeEnum.YOGA, TrainingTypeEnum.RUNNING, TrainingTypeEnum.BOX],
      certificateFilesNames: ['1.pdf', '2.pdf', '3.pdf', '4.pdf', '5.pdf', '6.pdf'],
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
      avatarFileName: 'friend-16.jpg',
      passwordHash: passwordHash,
      sex: SexEnum.MALE,
      birthDate: getRandomDate(new Date('1975-1-1'), new Date('2005-1-1')),
      role: UserRoleEnum.TRAINER,
      description: 'Привет! Меня зовут Ярослав. Мастер спорта по боксу, кмс по рукопашному бою, кмс по кикбоксингу',
      location: LocationEnum.PETROGRADSKAYA,
      backgroundImgFileName: 'cde12023aef07be50c95e9f5f6be1244',
      createdAt: getRandomDate(new Date('2020-1-1'), new Date('2023-10-1')),
      trainingLevel: TrainingLevelEnum.PROFESSIONAL,
      trainingType: [TrainingTypeEnum.BOX, TrainingTypeEnum.RUNNING, TrainingTypeEnum.CROSSFIT],
      certificateFilesNames: ['1.pdf', '2.pdf', '3.pdf', '4.pdf', '5.pdf', '6.pdf'],
      merits: 'Персональный тренер и инструктор групповых программ с опытом  более 10 лет.',
      isReadyForTraining: true,
    }
  });
}

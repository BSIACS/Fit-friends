import { PrismaClient } from '@prisma/client';
import { SexEnum } from '../src/types/sex.enum';
import { TrainingDurationEnum } from '../src/types/training-duration.enum';
import { TrainingLevelEnum } from '../src/types/training-level.enum';
import { TrainingTypeEnum } from '../src/types/training-type.enum';

export async function fillTrainings(prisma: PrismaClient) {
  await prisma.training.upsert({
    where: { id: '89847a26-07a0-458f-af2e-d173cc7e10c5' },
    update: {},
    create: {
      id: '89847a26-07a0-458f-af2e-d173cc7e10c5',
      name: 'CROSSFIT',
      backgroundImgFileName: 'cc8e3b0e8be3d74cf94c2375a4dff6ff',
      trainingLevel: TrainingLevelEnum.BEGINNER,
      trainingType: TrainingTypeEnum.CROSSFIT,
      trainingDuration: TrainingDurationEnum.THIRTY_FIFTY,
      price: 0,
      calories: 1200,
      description: 'Сложный комплекс упражнений для профессиональных атлетов на отработку показателей в классическом стиле.',
      sex: SexEnum.NOT_STATED,
      videoDemoFileName: 'cde12023aef07be50c95e9f5f6be1244',
      rating: 24,
      votesNumber: 5,
      trainingCreatorId: '6c81306f-beb0-495d-a044-4fc6a2209724',
      isSpecial: false,
    }
  });

  await prisma.training.upsert({
    where: { id: 'af430d39-5608-4815-9de9-ff43be0c6936' },
    update: {},
    create: {
      id: 'af430d39-5608-4815-9de9-ff43be0c6936',
      name: 'ENERGY',
      backgroundImgFileName: 'cc8e3b0e8be3d74cf94c2375a4dff6ff',
      trainingLevel: TrainingLevelEnum.BEGINNER,
      trainingType: TrainingTypeEnum.PILATES,
      trainingDuration: TrainingDurationEnum.FIFTY_EIGHTY,
      price: 800,
      calories: 320,
      description: 'Упражнения укрепляют мышечный корсет, делают суставы более гибкими, улучшают осанку и координацию.',
      sex: SexEnum.NOT_STATED,
      videoDemoFileName: 'cde12023aef07be50c95e9f5f6be1244',
      rating: 0,
      votesNumber: 0,
      trainingCreatorId: '9584ad02-ed85-438e-aead-797fd55978d8',
      isSpecial: false,
    }
  });

  await prisma.training.upsert({
    where: { id: 'f9915399-1040-40ac-b84a-5e529f564cff' },
    update: {},
    create: {
      id: 'f9915399-1040-40ac-b84a-5e529f564cff',
      name: 'BOXING',
      backgroundImgFileName: 'cc8e3b0e8be3d74cf94c2375a4dff6ff',
      trainingLevel: TrainingLevelEnum.AMATEUR,
      trainingType: TrainingTypeEnum.BOX,
      trainingDuration: TrainingDurationEnum.FIFTY_EIGHTY,
      price: 1000,
      calories: 800,
      description: 'Тренировка на отработку правильных ударов, координации и оптимальной механики защитных движений.',
      sex: SexEnum.NOT_STATED,
      videoDemoFileName: 'cde12023aef07be50c95e9f5f6be1244',
      rating: 0,
      votesNumber: 0,
      trainingCreatorId: '6c81306f-beb0-495d-a044-4fc6a2209724',
      isSpecial: false,
    }
  });

  await prisma.training.upsert({
    where: { id: '18237a96-aac0-49af-9309-6b4e3f881109' },
    update: {},
    create: {
      id: '18237a96-aac0-49af-9309-6b4e3f881109',
      name: 'ANTISTRESS',
      backgroundImgFileName: 'cc8e3b0e8be3d74cf94c2375a4dff6ff',
      trainingLevel: TrainingLevelEnum.BEGINNER,
      trainingType: TrainingTypeEnum.YOGA,
      trainingDuration: TrainingDurationEnum.FIFTY_EIGHTY,
      price: 1400,
      calories: 250,
      description: 'В основе программы лежит работа с телом и с психо-эмоциональным состоянием. Уберем зажимы тела, избавимся от стресса.',
      sex: SexEnum.NOT_STATED,
      videoDemoFileName: 'cde12023aef07be50c95e9f5f6be1244',
      rating: 0,
      votesNumber: 0,
      trainingCreatorId: '9584ad02-ed85-438e-aead-797fd55978d8',
      isSpecial: false,
    }
  });

  await prisma.training.upsert({                                //5
    where: { id: 'a7119df3-c77a-4994-9621-739a7356b122' },
    update: {},
    create: {
      id: 'a7119df3-c77a-4994-9621-739a7356b122',
      name: 'RUN, FORREST, RUN',
      backgroundImgFileName: 'cc8e3b0e8be3d74cf94c2375a4dff6ff',
      trainingLevel: TrainingLevelEnum.AMATEUR,
      trainingType: TrainingTypeEnum.RUNNING,
      trainingDuration: TrainingDurationEnum.EIGHTY_HUNDRED,
      price: 1600,
      calories: 500,
      description: 'Узнайте правильную технику бега, развивайте выносливость и откройте для себя все секреты длительных пробежек.',
      sex: SexEnum.NOT_STATED,
      videoDemoFileName: 'cde12023aef07be50c95e9f5f6be1244',
      rating: 0,
      votesNumber: 0,
      trainingCreatorId: '6c81306f-beb0-495d-a044-4fc6a2209724',
      isSpecial: false,
    }
  });

  await prisma.training.upsert({                                //5
    where: { id: '91f53ff0-3500-493b-9971-46000f93b3b0' },
    update: {},
    create: {
      id: '91f53ff0-3500-493b-9971-46000f93b3b0',
      name: 'FITBALL',
      backgroundImgFileName: 'cc8e3b0e8be3d74cf94c2375a4dff6ff',
      trainingLevel: TrainingLevelEnum.AMATEUR,
      trainingType: TrainingTypeEnum.RUNNING,
      trainingDuration: TrainingDurationEnum.EIGHTY_HUNDRED,
      price: 1600,
      calories: 200,
      description: 'Тренировка на фитболе — отличном тренажере для развития чувства баланса и равновесия, улучшения координации.',
      sex: SexEnum.FEMALE,
      videoDemoFileName: 'cde12023aef07be50c95e9f5f6be1244',
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
      name: 'HATHA',
      backgroundImgFileName: 'cc8e3b0e8be3d74cf94c2375a4dff6ff',
      trainingLevel: TrainingLevelEnum.BEGINNER,
      trainingType: TrainingTypeEnum.YOGA,
      trainingDuration: TrainingDurationEnum.FIFTY_EIGHTY,
      price: 1800,
      calories: 350,
      description: 'Упражнения по хатха йоге, направленные на понижение нервной возбудимости и активацию процессов анаболизма.',
      sex: SexEnum.NOT_STATED,
      videoDemoFileName: 'cde12023aef07be50c95e9f5f6be1244',
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
      name: 'FULL BODY STRETCH',
      backgroundImgFileName: 'cc8e3b0e8be3d74cf94c2375a4dff6ff',
      trainingLevel: TrainingLevelEnum.BEGINNER,
      trainingType: TrainingTypeEnum.STRETCHING,
      trainingDuration: TrainingDurationEnum.EIGHTY_HUNDRED,
      price: 1800,
      calories: 400,
      description: 'Комплекс упражнений на растяжку всего тела для новичков. Плавное погружение в стретчинг и умеренная нагрузка.',
      sex: SexEnum.NOT_STATED,
      videoDemoFileName: 'cde12023aef07be50c95e9f5f6be1244',
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
      name: `DEVIL'S CINDY`,
      backgroundImgFileName: 'cc8e3b0e8be3d74cf94c2375a4dff6ff',
      trainingLevel: TrainingLevelEnum.AMATEUR,
      trainingType: TrainingTypeEnum.STRETCHING,
      trainingDuration: TrainingDurationEnum.EIGHTY_HUNDRED,
      price: 2200,
      calories: 950,
      description: 'Знаменитый кроссфит комплекс. Синди — универсальная тренировка для развития функциональной силы.',
      sex: SexEnum.NOT_STATED,
      videoDemoFileName: 'cde12023aef07be50c95e9f5f6be1244',
      rating: 0,
      votesNumber: 0,
      trainingCreatorId: '9584ad02-ed85-438e-aead-797fd55978d8',
      isSpecial: false,
    }
  });

  await prisma.training.upsert({
    where: { id: '97221f8d-6eae-46e6-8994-11e9cbcd54ec' },
    update: {},
    create: {
      id: '97221f8d-6eae-46e6-8994-11e9cbcd54ec',
      name: 'FLEKSBEND',
      backgroundImgFileName: 'cc8e3b0e8be3d74cf94c2375a4dff6ff',
      trainingLevel: TrainingLevelEnum.AMATEUR,
      trainingType: TrainingTypeEnum.AEROBICS,
      trainingDuration: TrainingDurationEnum.EIGHTY_HUNDRED,
      price: 2400,
      calories: 450,
      description: 'Тренируясь с резинкой для фитнеса, вы можете проработать почти все мышечные группы и разнообразить тренировки.',
      sex: SexEnum.FEMALE,
      videoDemoFileName: 'cde12023aef07be50c95e9f5f6be1244',
      rating: 0,
      votesNumber: 0,
      trainingCreatorId: '9584ad02-ed85-438e-aead-797fd55978d8',
      isSpecial: false,
    }
  });
}

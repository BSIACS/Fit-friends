import { PrismaClient } from '@prisma/client';
import { SexEnum } from '../src/types/sex.enum';
import { TrainingDurationEnum } from '../src/types/training-duration.enum';
import { TrainingLevelEnum } from '../src/types/training-level.enum';
import { TrainingTypeEnum } from '../src/types/training-type.enum';

export async function fillTrainings(prisma: PrismaClient) {
  await prisma.training.upsert({                                //1
    where: { id: 'af430d39-5608-4815-9de9-ff43be0c6936' },
    update: {},
    create: {
      id: 'af430d39-5608-4815-9de9-ff43be0c6936',
      name: 'ENERGY',
      backgroundImgFileName: 'cc8e3b0e8be3d74cf94c2375a4dff6ff',
      trainingLevel: TrainingLevelEnum.BEGINNER,
      trainingType: TrainingTypeEnum.PILATES,
      trainingDuration: TrainingDurationEnum.FIFTY_EIGHTY,
      price: 2400,
      calories: 2000,
      description: 'Упражнения укрепляют мышечный корсет, делают суставы более гибкими, улучшают осанку и координацию.',
      sex: SexEnum.NOT_STATED,
      videoDemoFileName: 'cde12023aef07be50c95e9f5f6be1244',
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
      name: 'CROSSFIT',
      backgroundImgFileName: 'cc8e3b0e8be3d74cf94c2375a4dff6ff',
      trainingLevel: TrainingLevelEnum.BEGINNER,
      trainingType: TrainingTypeEnum.PILATES,
      trainingDuration: TrainingDurationEnum.FIFTY_EIGHTY,
      price: 2400,
      calories: 2000,
      description: 'Сложный комплекс упражнений для профессиональных атлетов на отработку показателей в классическом стиле.',
      sex: SexEnum.NOT_STATED,
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
      price: 2400,
      calories: 2000,
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
      name: 'ANTISTRESS',
      backgroundImgFileName: 'cc8e3b0e8be3d74cf94c2375a4dff6ff',
      trainingLevel: TrainingLevelEnum.AMATEUR,
      trainingType: TrainingTypeEnum.BOX,
      trainingDuration: TrainingDurationEnum.EIGHTY_HUNDRED,
      price: 3000,
      calories: 2500,
      description: 'В основе программы лежит работа с телом и с психо-эмоциональным состоянием. Уберем зажимы тела, избавимся от стресса.',
      sex: SexEnum.NOT_STATED,
      videoDemoFileName: 'cde12023aef07be50c95e9f5f6be1244',
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
      name: 'RUN, FORREST, RUN',
      backgroundImgFileName: 'cc8e3b0e8be3d74cf94c2375a4dff6ff',
      trainingLevel: TrainingLevelEnum.AMATEUR,
      trainingType: TrainingTypeEnum.RUNNING,
      trainingDuration: TrainingDurationEnum.EIGHTY_HUNDRED,
      price: 3000,
      calories: 2900,
      description: 'Узнайте правильную технику бега, развивайте выносливость и откройте для себя все секреты длительных пробежек.',
      sex: SexEnum.NOT_STATED,
      videoDemoFileName: 'cde12023aef07be50c95e9f5f6be1244',
      rating: 0,
      votesNumber: 0,
      trainingCreatorId: '6c81306f-beb0-495d-a044-4fc6a2209724',
      isSpecial: false,
    }
  });
}

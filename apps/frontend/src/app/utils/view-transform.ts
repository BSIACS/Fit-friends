import { LocationEnum } from '../types/location.enum';
import { SexEnum } from '../types/sex.enum';
import { TrainingLevelEnum } from '../types/training-level.enum'

export const getTrainingLevel = (trainingLevel: TrainingLevelEnum) => {
  switch (trainingLevel) {
    case TrainingLevelEnum.BEGINNER:
      return 'Новичок';
    case TrainingLevelEnum.AMATEUR:
      return 'Любитель';
    case TrainingLevelEnum.PROFESSIONAL:
      return 'Профессионал';
  };
}

export const getSex = (sex: SexEnum) => {
  switch (sex) {
    case SexEnum.MALE:
      return 'Мужской';
    case SexEnum.FEMALE:
      return 'Женский';
    case SexEnum.NOT_STATED:
      return 'Неважно';
  };
}

export const getLocation = (location: LocationEnum) => {
  switch (location) {
    case LocationEnum.PETROGRADSKAYA:
      return 'ст. м. Петроградская';
    case LocationEnum.PIONERSKAYA:
      return 'ст. м. Пионерская';
    case LocationEnum.SPORTIVNAYA:
      return 'ст. м. Спортивная';
    case LocationEnum.UDELNAYA:
      return 'ст. м. Удельная';
    case LocationEnum.ZVYOZDNAYA:
      return 'ст. м. Звездная';
  };
}

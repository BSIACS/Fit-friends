import { LocationEnum } from '../types/location.enum';
import { SexEnum } from '../types/sex.enum';
import { TrainingDurationEnum } from '../types/training-duration.enum';
import { TrainingLevelEnum } from '../types/training-level.enum'
import { TrainingTypeEnum } from '../types/training-type.enum';

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

export const getLocationTag = (location: LocationEnum) => {
  switch (location) {
    case LocationEnum.PETROGRADSKAYA:
      return 'Петроградская';
    case LocationEnum.PIONERSKAYA:
      return 'Пионерская';
    case LocationEnum.SPORTIVNAYA:
      return 'Спортивная';
    case LocationEnum.UDELNAYA:
      return 'Удельная';
    case LocationEnum.ZVYOZDNAYA:
      return 'Звездная';
  };
}

export const getTypeTraining = (trainingType: TrainingTypeEnum) => {
  switch (trainingType) {
    case TrainingTypeEnum.AEROBICS:
      return 'аэробика';
    case TrainingTypeEnum.BOX:
      return 'бокс';
    case TrainingTypeEnum.CROSSFIT:
      return 'кроссфит';
    case TrainingTypeEnum.PILATES:
      return 'пилатес';
    case TrainingTypeEnum.RUNNING:
      return 'бег';
    case TrainingTypeEnum.STRETCHING:
      return 'стрэтчинг';
    case TrainingTypeEnum.YOGA:
      return 'йога';
  };
}

export const getTypeTrainingTag = (trainingType: TrainingTypeEnum) => {
  switch (trainingType) {
    case TrainingTypeEnum.AEROBICS:
      return '#аэробика';
    case TrainingTypeEnum.BOX:
      return '#бокс';
    case TrainingTypeEnum.CROSSFIT:
      return '#кроссфит';
    case TrainingTypeEnum.PILATES:
      return '#пилатес';
    case TrainingTypeEnum.RUNNING:
      return '#бег';
    case TrainingTypeEnum.STRETCHING:
      return '#стрэтчинг';
    case TrainingTypeEnum.YOGA:
      return '#йога';
  };
}

export const getDurationTrainingTag = (trainingDuration: TrainingDurationEnum) => {
  switch (trainingDuration) {
    case TrainingDurationEnum.TEN_THIRTY:
      return '#10_30минут';
    case TrainingDurationEnum.THIRTY_FIFTY:
      return '#30_50минут';
    case TrainingDurationEnum.FIFTY_EIGHTY:
      return '#50_80минут';
    case TrainingDurationEnum.EIGHTY_HUNDRED:
      return '#80_100минут';
  };
}

export const getSexTrainingTag = (trainingDuration: SexEnum) => {
  switch (trainingDuration) {
    case SexEnum.MALE:
      return '#для_мужчин';
    case SexEnum.FEMALE:
      return '#для_женщин';
    case SexEnum.NOT_STATED:
      return '#для_всех';
  };
}

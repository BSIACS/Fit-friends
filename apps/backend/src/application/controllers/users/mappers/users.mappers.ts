
import { TrainerRdo } from '../rdo/trainer.rdo';
import { UserRdo } from '../rdo/user.rdo';
import { TrainerEntityInterface } from '../../../../entities/trainer-entity.interface';
import { UserEntityInterface } from '../../../../entities/user-entity.interface';
import { UserRoleEnum } from '../../../../types/user-role.enum';

export const fromEntityToUserRdo = (entity: UserEntityInterface): UserRdo => {
  return {
    id: entity.id,
    name: entity.name,
    email: entity.email,
    avatarFileName: entity.avatarFileName,
    birthDate: entity.birthDate,
    description: entity.description,
    role: entity.role,
    sex: entity.sex,
    calories: entity.calories,
    caloriesPerDay: entity.caloriesPerDay,
    location: entity.location,
    backgroundImgFileName: entity.backgroundImgFileName,
    trainingLevel: entity.trainingLevel,
    trainingDuration: entity.trainingDuration,
    trainingType: entity.trainingType,
    isReadyForTraining: entity.isReadyForTraining,
    friends: entity.friends,
  }
}

export const fromEntitiesToUsersRdos = (entities: UserEntityInterface[]): UserRdo[] => {
  return entities.map((entity) => fromEntityToUserRdo(entity));
}

export const fromEntitiesToUsersAndTrainersRdos = (entities: (UserEntityInterface | TrainerEntityInterface)[]): (UserRdo | TrainerRdo)[] => {
  return entities.map((entity) => entity.role === UserRoleEnum.USER ? fromEntityToUserRdo(entity as UserEntityInterface) : fromEntityToTrainerRdo(entity));
}

export const fromEntityToTrainerRdo = (entity: TrainerEntityInterface): TrainerRdo => {
  return {
    id: entity.id,
    name: entity.name,
    email: entity.email,
    avatarFileName: entity.avatarFileName,
    birthDate: entity.birthDate,
    description: entity.description,
    role: entity.role,
    sex: entity.sex,
    location: entity.location,
    backgroundImgFileName: entity.backgroundImgFileName,
    trainingLevel: entity.trainingLevel,
    trainingType: entity.trainingType,
    merits: entity.merits,
    isReadyForTraining: entity.isReadyForTraining,
    subscribers: entity.subscribers,
  }
}

export const fromEntitiesToTrainersRdos = (entities: TrainerEntityInterface[]): TrainerRdo[] => {
  return entities.map((entity) => fromEntityToTrainerRdo(entity));
}

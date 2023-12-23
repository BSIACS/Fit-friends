import { TrainingEntityInterface } from '../../trainings/training-entity.interface';
import { TrainingRdo } from '../rdo/training.rdo';



export const fromEntityToTrainingRdo = (entity: TrainingEntityInterface): TrainingRdo => {
  return {
    id: entity.id,
    name: entity.name,
    backgroundImgFileName: entity.backgroundImgFileName,
    trainingLevel: entity.trainingLevel,
    trainingType: entity.trainingType,
    trainingDuration: entity.trainingDuration,
    price: entity.price,
    calories: entity.calories,
    description: entity.description,
    sex: entity.sex,
    videoDemoFileName: entity.videoDemoFileName,
    rating: +entity.rating,
    trainingCreatorId: entity.trainingCreatorId,
    isSpecial: entity.isSpecial,
  }
}

export const fromEntitiesToTrainingsRdos = (entities: TrainingEntityInterface[]): TrainingRdo[] => {
  return entities.map((entity) => fromEntityToTrainingRdo(entity));
}



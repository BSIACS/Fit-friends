import { PersonInterface } from './person.interface';
import { TrainingLevelEnum } from './training-level.enum';
import { TrainingTypeEnum } from './training-type.enum';
import { TrainingDurationEnum } from './training-duration.enum';

export interface UserInterface extends PersonInterface {
  trainingLevel: TrainingLevelEnum,
  trainingType: TrainingTypeEnum[],
  trainingDuration: TrainingDurationEnum,
  calories: number,
  caloriesPerDay: number,
  isReadyForTraining: boolean,
}

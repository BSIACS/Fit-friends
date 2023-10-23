import { TrainingLevelEnum } from './training-level.enum';
import { TrainingTypeEnum } from './training-type.enum';
import { PersonInterface } from './person.interface';

export interface TrainerInterface extends PersonInterface{
  trainingLevel: TrainingLevelEnum,
  trainingType: TrainingTypeEnum[],
  certificates: string,
  merits: string,
  isReadyForTraining: boolean,
}

import { TrainingLevelEnum } from '../../../../types/training-level.enum';
import { TrainingTypeEnum } from '../../../../types/training-type.enum';


export interface GetUsersFilterParams{
  locations: string[];
  trainingLevel: TrainingLevelEnum;
  trainingType: string[];
}

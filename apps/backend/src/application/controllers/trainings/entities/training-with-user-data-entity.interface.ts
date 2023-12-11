import { TrainerEntityInterface } from '../../../../entities/trainer-entity.interface';
import { UUID } from '../../../../types/uuid.type';

export interface TrainingWithUserDataEntityInterface {
  id: UUID;
  name: string;
  backgroundImgFileName: string;
  trainingLevel: string;
  trainingType: string;
  trainingDuration: string,
  price: number;
  calories: number;
  description: string;
  sex: string;
  videoDemoFileName: string;
  rating: number;
  votesNumber: number;
  trainingCreatorId: UUID;
  isSpecial: boolean;
  trainer: TrainerEntityInterface;
}

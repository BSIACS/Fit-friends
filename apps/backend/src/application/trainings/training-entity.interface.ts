import { UUID } from '../../types/uuid.type'

export interface TrainingEntityInterface {
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
  trainingCreatorId: UUID;
  isSpecial: boolean;
}

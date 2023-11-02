import { UUID } from '../../types/uuid.type'

export interface TrainingEntityInterface {
  id: UUID;
  name: string;
  backgroundImgSrc: string;
  trainingLevel: string;
  trainingType: string;
  trainingDuration: string,
  price: number;
  calories: number;
  description: string;
  sex: string;
  videoDemoSrc: string;
  rating: number;
  trainingCreatorId: UUID;
  isSpecial: boolean;
}

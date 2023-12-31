import { UUID } from '../../../../types/uuid.type';

export class TrainingRdo {
  id: UUID;
  name: string;
  backgroundImgFileName: string;
  trainingLevel: string;
  trainingType: string;
  trainingDuration: string;
  price: number;
  calories: number;
  description: string;
  sex: string;
  videoDemoFileName: string;
  rating: string;
  trainingCreatorId: string;
  isSpecial: boolean;
}

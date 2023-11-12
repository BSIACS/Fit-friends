import { UUID } from '../../../types/uuid.type';

export class UserRdo {
  id: UUID;
  name: string;
  email: string;
  avatarFileName: string;
  sex: string;
  birthDate: Date;
  description: string;
  role: string;
  location: string;
  trainingLevel: string;
  trainingDuration: string;
  trainingType: string[];
  backgroundImgFileName: string;
  calories: number;
  caloriesPerDay: number;
  isReadyForTraining: boolean;
}

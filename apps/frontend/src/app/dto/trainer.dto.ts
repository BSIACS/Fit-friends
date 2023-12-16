import { UUID } from '../types/uuid.type';

export class TrainerDTO {
  id?: string;
  name?: string;
  email?: string;
  avatarFileName?: string;
  birthDate?: string;
  description?: string;
  role?: string;
  sex?: string;
  location?: string;
  backgroundImgFileName?: string;
  trainingLevel?: string;
  trainingType?: string[];
  merits?: string;
  isReadyForTraining?: boolean;
  subscribers?: UUID[];
}

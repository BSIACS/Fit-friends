import { UUID } from '../../../../types/uuid.type';

export class TrainerRdo {
  id: UUID
  name: string;
  email: string;
  avatarFileName: string;
  sex: string;
  birthDate: Date;
  role: string;
  description: string;
  location: string;
  backgroundImgFileName: string;
  trainingLevel: string;
  trainingType: string[];
  merits: string;
  isReadyForTraining: boolean;
}

import { PersonalTrainingRequestStatusEnum } from './personal-training-request-status.enum';

export interface PersonalTrainingRequest {
  requesterId: string;
  responserId: string;
  createdAt: Date;
  statusChangedAt: Date;
  status: PersonalTrainingRequestStatusEnum;
}

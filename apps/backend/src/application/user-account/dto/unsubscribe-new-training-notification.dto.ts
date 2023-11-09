import { UUID } from '../../../types/uuid.type';


export class UnsubscribeNewTrainingNotificationDto {
  trainerId: UUID;
  subscriberId: UUID;
}

import { UUID } from '../../../types/uuid.type';

export interface GetNotificationsRdo {
  id: UUID;
  text: string;
  createdAt: Date;
}

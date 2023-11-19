import { UUID } from '../../../types/uuid.type'

export interface NotificationEntityInterface {
  id: UUID;
  userId: UUID;
  text: string;
  createdAt: Date;
}

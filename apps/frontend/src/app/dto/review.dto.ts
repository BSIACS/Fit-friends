import { UUID } from '../types/uuid.type';

export class ReviewDTO {
  public id?: UUID;
  public userId?: UUID;
  public trainingId?: UUID;
  public rating?: number;
  public text?: string;
  public createdAt?: string;
  public user?: {
    id: UUID,
    name: string,
    avatarFileName: string,
  }
}

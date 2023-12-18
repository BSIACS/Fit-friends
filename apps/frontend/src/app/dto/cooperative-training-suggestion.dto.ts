import { UUID } from '../types/uuid.type';

export class CooperativeTrainingInvitationDTO {
  public id?: UUID;
  public requesterId?: UUID;
  public responserId?: UUID;
  public status?: string;
  public createdAt?: string;
  public statusChangedAt?: string;
}

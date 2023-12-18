import { UUID } from '../types/uuid.type';

export class PersonalTrainingInvitationDTO {
  public id?: UUID;
  public requestorId?: UUID;
  public responserId?: UUID;
  public status?: string;
  public createdAt?: string;
  public statusChangedAt?: string;
}

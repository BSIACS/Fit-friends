import { IsDate, IsEnum, IsUUID } from 'class-validator';
import { UUID } from '../../../types/uuid.type';
import { PersonalTrainingRequestStatusEnum } from '../../../types/personal-training-request-status.enum';



export class CreatePersonalTrainingRequestDto {
  @IsUUID()
  requesterId: UUID;

  @IsUUID()
  responserId: UUID;

  @IsDate()
  statusChangedDate: Date;

  @IsEnum(PersonalTrainingRequestStatusEnum)
  status: PersonalTrainingRequestStatusEnum;
}

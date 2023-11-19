import { IsUUID } from 'class-validator';
import { UUID } from '../../../../types/uuid.type';


export class GetTrainingListDto {
  @IsUUID()
  trainerId: UUID;
}

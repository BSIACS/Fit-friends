import { IsOptional } from 'class-validator';
import { TrainingRequestStatusEnum } from '../../../../types/training-request-status.enum';


export class GetAllForResponserDto {
  @IsOptional()
  status: TrainingRequestStatusEnum;
}

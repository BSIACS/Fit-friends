import { IsEnum, IsUUID } from 'class-validator';
import { UUID } from '../../../../types/uuid.type';
import { TrainingRequestStatusEnum } from '../../../../types/training-request-status.enum';
import { ApiProperty } from '@nestjs/swagger';


export class ChangePersonalTrainingRequestStatusDto {
  @ApiProperty({
    description: 'Training request UUID',
    example: '59bce336-fc4f-4a72-8840-ae903102caf9',
  })
  @IsUUID()
  id: UUID;

  @ApiProperty({
    description: 'Training request new status',
    example: 'ACCEPTED',
  })
  @IsEnum(TrainingRequestStatusEnum)
  status: TrainingRequestStatusEnum;
}

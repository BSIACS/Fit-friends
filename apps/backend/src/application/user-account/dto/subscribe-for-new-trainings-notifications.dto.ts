import { ApiProperty } from '@nestjs/swagger';
import { UUID } from '../../../types/uuid.type';
import { IsUUID } from 'class-validator';


export class SubscribeForNewTrainingsNotificationsDto {
  @ApiProperty({
    description: 'Trainer UUID',
    example: '59bce336-fc4f-4a72-8840-ae903102caf9',
  })
  @IsUUID()
  trainerId: UUID;
}

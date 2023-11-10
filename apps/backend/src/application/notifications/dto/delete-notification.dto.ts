import { IsUUID } from 'class-validator';
import { UUID } from '../../../types/uuid.type';
import { ApiProperty } from '@nestjs/swagger';


export class DeleteNotificationDto {
  @ApiProperty({
    description: 'ID of the notification to delete',
    example: '9694b16d-af53-4cd0-b85c-c83b55862996',
  })
  @IsUUID()
  id: UUID;
}

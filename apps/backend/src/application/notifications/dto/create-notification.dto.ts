import { IsUUID, Max, Min } from 'class-validator';
import { UUID } from '../../../types/uuid.type';
import { ApiProperty } from '@nestjs/swagger';


export class CreateNotificationDto {
  @ApiProperty({
    description: 'ID of the user for whom the message is intended',
    example: '9694b16d-af53-4cd0-b85c-c83b55862996',
  })
  @IsUUID()
  recipientId: UUID;

  @ApiProperty({
    description: 'User notification text',
    example: 'Привет, Мария! Приветствуем Вас на FitFriends — онлайн площадке для поиска тренировок.',
  })
  @Min(10)
  @Max(140)
  text: string;
}

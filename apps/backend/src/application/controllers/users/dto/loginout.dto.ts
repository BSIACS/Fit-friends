import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { UUID } from '../../../../types/uuid.type';

export class LogoutDto{
  @ApiProperty({
    description: 'User unique id',
    example: '18d1bcf9-b2e2-408c-8f25-97e298102a73',
  })
  @IsUUID()
  id: UUID;
}

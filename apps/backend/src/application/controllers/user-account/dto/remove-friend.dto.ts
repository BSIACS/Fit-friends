import { IsUUID } from 'class-validator';
import { UUID } from '../../../../types/uuid.type';
import { ApiProperty } from '@nestjs/swagger';


export class RemoveFrindDto {
  @ApiProperty({
    description: 'User UUID',
    example: '59bce336-fc4f-4a72-8840-ae903102caf9',
  })
  @IsUUID()
  friendId: UUID;
}

import { IsUUID } from 'class-validator';
import { UUID } from '../../../../types/uuid.type';
import { ApiProperty } from '@nestjs/swagger';


export class CreatePersonalTrainingRequestDto {
  @ApiProperty({
    description: 'User UUID for whom request is intended',
    example: '59bce336-fc4f-4a72-8840-ae903102caf9',
  })
  @IsUUID()
  responserId: UUID;
}

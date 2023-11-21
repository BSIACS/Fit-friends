import { ApiProperty } from '@nestjs/swagger';
import { UUID } from '../../../../types/uuid.type';
import { IsInt, IsUUID } from 'class-validator';


export class RemoveFromBalanceDto {
  @ApiProperty({
    description: 'User UUID',
    example: '59bce336-fc4f-4a72-8840-ae903102caf9',
  })
  @IsUUID()
  trainingId: UUID;

  @ApiProperty({
    description: 'Trainings to add quantity',
    example: 42,
  })
  @IsInt()
  quantity: number;
}

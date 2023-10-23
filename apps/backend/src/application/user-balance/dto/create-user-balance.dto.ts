import { IsInt, IsUUID } from 'class-validator';
import { UUID } from '../../../types/uuid.type';


export class CreateUserBalanceDto {
  @IsUUID()
  userId: UUID;

  @IsUUID()
  trainingId: UUID;

  @IsInt()
  quantity: number;
}

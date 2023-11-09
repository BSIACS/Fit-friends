import { UUID } from '../../../types/uuid.type';


export class AddToBalanceDto {
  userId: UUID;
  trainingId: UUID;
  quantity: number;
}

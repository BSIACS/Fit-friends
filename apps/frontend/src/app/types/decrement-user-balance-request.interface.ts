import { UUID } from './uuid.type';

export interface DecrementUserBalanceRequest {
  trainingId: UUID;
  quantity: number;
}

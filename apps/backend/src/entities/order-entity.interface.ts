import { UUID } from '../types/uuid.type'

export interface OrderEntityInterface {
  id: UUID;
  userId: string;
  purchaseType: string;
  trainingId: string;
  price: number;
  quantity: number;
  totalPrice: number;
  paymentMethod: string;
  createdAt: Date;
}

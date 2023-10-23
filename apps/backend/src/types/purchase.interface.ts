import { PaymentMethodEnum } from './payment-method.enum';
import { PurchaseTypeEnum } from './purchase-type.enum';
import { TrainingTypeEnum } from './training-type.enum';

export interface Purchase {
  purchaseType: PurchaseTypeEnum;
  trainingId: TrainingTypeEnum;         // Существующая в системе тренировка. Указать id.
  price: number;
  quantity: number;
  totalPrice: number;
  paymentMethod: PaymentMethodEnum;
  createdAt: Date;
}

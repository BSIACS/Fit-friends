import { UUID } from '../../../../types/uuid.type';
import { TrainingRdo } from './training.rdo';

export class OrderRdo {
  id: UUID;
  totalPaid: number;
  totalPurchased: number;
  training: TrainingRdo;
}

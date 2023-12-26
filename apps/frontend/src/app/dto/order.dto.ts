import { UUID } from '../types/uuid.type';
import { TrainingDTO } from './training.dto';

export class OrderDTO {
  id?: UUID;
  totalPaid?: number;
  totalPurchased?: number;
  training?: TrainingDTO
}

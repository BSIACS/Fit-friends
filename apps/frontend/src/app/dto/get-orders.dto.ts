import { OrderDTO } from './order.dto';

export class GetOrdersDTO {
  orders!: OrderDTO[];
  count!: number;
}

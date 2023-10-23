import { IsUUID, Max, Min } from 'class-validator';
import { UUID } from '../../../types/uuid.type';


export class CreatePurchaseDto {
  @IsUUID()
  recipientId: UUID;

  @Min(10)
  @Max(140)
  text: string;
}

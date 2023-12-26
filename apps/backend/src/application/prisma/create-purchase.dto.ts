import { IsEnum, IsInt, IsUUID, Max, Min } from 'class-validator';
import { PurchaseTypeEnum } from '../../types/purchase-type.enum';
import { UUID } from '../../types/uuid.type';


export class CreatePurchaseDto {

  @IsEnum(PurchaseTypeEnum)
  purchaseType: PurchaseTypeEnum;

  @IsUUID()
  trainingId: UUID;

  @IsInt()
  @Min(0)
  price: number;

  @IsInt()
  @Min(1)
  @Max(50)
  quantity: number;

  paymentMethod: string;
}

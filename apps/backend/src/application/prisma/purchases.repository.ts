import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreatePurchaseDto } from './create-purchase.dto';
import { UUID } from '../../types/uuid.type';



@Injectable()
export class PurchasesRepository {

  constructor(private readonly prisma: PrismaService) { }

  public async createPurchase(dto: CreatePurchaseDto) {

    const createdPurchase = await this.prisma.purchase.create({
      data: {
        userId: dto.userId,
        purchaseType: dto.purchaseType,
        trainingId: dto.trainingId,
        price: dto.price,
        quantity: dto.quantity,
        paymentMethod: dto.paymentMethod,
        totalPrice: dto.price * dto.quantity,
        createdAt: new Date()
      }
    });

    return createdPurchase;
  }

  public async getPurchasesByTrainingIds(ids: UUID[]) {
    const foundPurchases = await this.prisma.purchase.findMany({
      where: {
        trainingId: {
          in: ids
        }
      }
    });

    return foundPurchases;
  }
}

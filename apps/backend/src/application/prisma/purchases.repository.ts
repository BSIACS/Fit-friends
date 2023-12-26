import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreatePurchaseDto } from './create-purchase.dto';
import { UUID } from '../../types/uuid.type';
import { GetOrdersQuery } from '../controllers/trainer-account/query/get-orders-list.query';
import { OrderEntityInterface } from '../../entities/order-entity.interface';



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

  public async getOrdersByTrainingsIds(ids: UUID[], query: GetOrdersQuery): Promise<OrderEntityInterface[]> {
    const foundOrders = await this.prisma.purchase.findMany({
      take: query.ordersPerPage * query.pageNumber,
      where: {
        trainingId: {
          in: ids
        }
      }
    });

    return foundOrders;
  }

  public async getOrdersCountByTrainingsIds(ids: UUID[]) {
    const count = await this.prisma.purchase.count({
      where: {
        trainingId: {
          in: ids
        }
      }
    });

    return count;
  }
}

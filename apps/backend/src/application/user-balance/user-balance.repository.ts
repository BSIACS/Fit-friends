import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UUID } from '../../types/uuid.type';
import { UserBalanceEntityInterface } from './entities/user-balance-entity.interface';


@Injectable()
export class UserBalanceRepository {

  constructor(private readonly prisma: PrismaService) { }

  public async findInBalanceByTrainingId(userId: UUID, trainingId: UUID) {
    const addedTraining = await this.prisma.userBalance.findFirst({
      where: {
        userId: userId,
        trainingId: trainingId,
      }
    });

    return addedTraining;
  }

  public async addToUserBalance(userId: UUID, trainingId: UUID, quantity: number) {
    const addedTraining = this.prisma.userBalance.create({
      data: {
        userId: userId,
        trainingId: trainingId,
        remained: quantity
      }
    });

    return addedTraining;
  }

  public async updateInUserBalance(userId: UUID, trainingId: UUID, quantity: number) {
    const updatedTraining = this.prisma.userBalance.updateMany({
      where: {
        userId: userId,
        trainingId: trainingId,
      },
      data: {
        remained: quantity
      }
    });

    return updatedTraining;
  }

  public async removeFromUserBalance(userId: UUID, trainingId: UUID) {
    const addedTraining = this.prisma.userBalance.deleteMany({
      where: {
        userId: userId,
        trainingId: trainingId,
      }
    });

    return addedTraining;
  }

  public async getUserBalance(userId: UUID): Promise<UserBalanceEntityInterface[]> {
    const foundBalance = await this.prisma.userBalance.findMany({
      where: {
        userId: userId
      },
      include: {
        training: true
      }
    });

    return foundBalance;
  }
}

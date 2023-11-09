import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UUID } from '../../types/uuid.type';



@Injectable()
export class NewTrainingsScheduledNotificationsRepository {

  constructor(private readonly prisma: PrismaService) { }

  public async createNewTrainingScheduledNotification(trainerId: UUID, trainingId: UUID, subscribersIds: UUID[]) {
    const createdNewScheduledNotification = await this.prisma.newTrainingsScheduledNotifications.create({
      data: {
        trainerId: trainerId,
        trainingId: trainingId,
        subscribers: subscribersIds
      }
    });

    return createdNewScheduledNotification;
  }

  public async getNewTrainingScheduledNotification(trainerId: UUID, trainingId: UUID) {
    const foundNewScheduledNotification = await this.prisma.newTrainingsScheduledNotifications.findFirst({
      where: {
          trainerId: trainerId,
          trainingId: trainingId,
      }
    })

    return foundNewScheduledNotification;
  }

  public async removeNewTrainingScheduledNotification(trainerId: UUID, trainingId: UUID) {
    await this.prisma.newTrainingsScheduledNotifications.deleteMany({
      where: {
        trainerId: trainerId,
        trainingId: trainingId,
      }
    })
  }
}

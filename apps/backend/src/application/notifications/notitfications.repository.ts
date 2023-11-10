import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UUID } from '../../types/uuid.type';
import { NotificationEntityInterface } from './notification-entity.interface';



@Injectable()
export class NotificationsRepository {

  constructor(private readonly prisma: PrismaService) { }

  public async findNotificationsByUserId(id: UUID): Promise<NotificationEntityInterface[]> {
    const foundNotifications = await this.prisma.notification.findMany({
      where: {
        userId: id
      }
    });

    return foundNotifications;
  }

  public async findNotificationByUserAndNotificationId(userId: UUID, notificationId: UUID): Promise<NotificationEntityInterface> {
    const foundNotification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId,
        userId: userId
      }
    });

    return foundNotification;
  }

  public async deleteNotificationByUserId(userId: UUID, notificationId: UUID): Promise<void> {
    await this.prisma.notification.delete({
      where: {
        id: notificationId,
        userId: userId
      }
    });

    return;
  }
}

import { Injectable } from '@nestjs/common';
import { UUID } from '../../types/uuid.type';
import { NotificationsRepository } from './notitfications.repository';
import { NotificationEntityInterface } from './notification-entity.interface';
import { NotificationDoesNotExistException } from '../exceptions/notification-does-not-exist.exception';


@Injectable()
export class NotificationsService {

  constructor(
    private readonly notificationsRepository: NotificationsRepository
  ) { }

  public async getNotifications(userId: UUID): Promise<NotificationEntityInterface[]> {
    const foundNotifications = await this.notificationsRepository.findNotificationsByUserId(userId);

    return foundNotifications;
  }

  public async deleteNotification(userId: UUID, notificationId: UUID): Promise<void> {
    const foundNotifications = await this.notificationsRepository.findNotificationByUserAndNotificationId(userId, notificationId);

    if(!foundNotifications){
      throw new NotificationDoesNotExistException(notificationId, 'id');
    }

    await this.notificationsRepository.deleteNotificationByUserId(userId, notificationId)

    return;
  }
}

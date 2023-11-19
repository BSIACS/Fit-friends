import { NotificationEntityInterface } from '../notification-entity.interface';
import { GetNotificationsRdo } from '../rdo/get-notifications.rdo';

export const fromEntityToGetNotificationsRdo = (entity: NotificationEntityInterface): GetNotificationsRdo => {
  return {
    id: entity.id,
    text: entity.text,
    createdAt: entity.createdAt
  }
}

export const fromEntitiesToGetNotificationsRdos = (entities: NotificationEntityInterface[]): GetNotificationsRdo[] => {
  return entities.map((entity) => fromEntityToGetNotificationsRdo(entity));
}

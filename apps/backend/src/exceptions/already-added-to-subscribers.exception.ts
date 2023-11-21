import { BadRequestException } from '@nestjs/common';
import { UUID } from '../types/uuid.type';

export class AlreadyAddedToSubscribers extends BadRequestException {
  constructor(id: UUID) {
    super(`User with the id <${id}> has been already added to subscribers.`);
  }
}

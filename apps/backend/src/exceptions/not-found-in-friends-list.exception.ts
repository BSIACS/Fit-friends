import { BadRequestException } from '@nestjs/common';
import { UUID } from '../types/uuid.type';

export class NotFoundInFriendsList extends BadRequestException {
  constructor(id: UUID) {
    super(`User with the id <${id}> was not found in the friends list.`);
  }
}

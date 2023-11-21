import { NotFoundException } from '@nestjs/common';

export class NotificationDoesNotExistException extends NotFoundException {
  constructor(paramData: string, paramName: string) {
    super(`Notification with ${paramName} <${paramData}> does not exists`);
  }
}

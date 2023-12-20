import { NotFoundException } from '@nestjs/common';

export class UserDoesNotExistsException extends NotFoundException {
  constructor(paramData: string, paramName: string) {
    super(`[${paramName}] User with ${paramName} <${paramData}> does not exists`);
  }
}

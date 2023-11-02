import { NotFoundException } from '@nestjs/common';

export class UserDoesNotExistsException extends NotFoundException {
  constructor(paramData: string, paramName: string) {
    super(`User with this ${paramName} <${paramData}> does not exists`);
  }
}

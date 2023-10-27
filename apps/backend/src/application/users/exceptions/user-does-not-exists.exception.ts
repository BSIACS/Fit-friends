import { NotFoundException } from '@nestjs/common';

export class UserDoesNotExistsException extends NotFoundException {
  constructor(email: string) {
    super(`User with this email <${email}> does not exists`);
  }
}

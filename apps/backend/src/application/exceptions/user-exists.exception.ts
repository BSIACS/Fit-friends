import { NotAcceptableException } from '@nestjs/common';

export class UserExistsException extends NotAcceptableException {
  constructor(email: string) {
    super(`User with this email <${email}> already exists`);
  }
}

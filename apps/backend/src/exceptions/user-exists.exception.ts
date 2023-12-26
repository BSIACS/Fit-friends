import { NotAcceptableException } from '@nestjs/common';

export class UserExistsException extends NotAcceptableException {
  constructor(email: string) {
    super(`[email] Пользователь с таким паролем уже существует`);
  }
}

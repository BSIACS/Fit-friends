import { UnauthorizedException } from '@nestjs/common';

export class UserPasswordWrongException extends UnauthorizedException {
  constructor() {
    super('[password] User password is wrong');
  }
}

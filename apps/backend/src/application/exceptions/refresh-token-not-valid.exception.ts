import { UnauthorizedException } from '@nestjs/common';

export class RefreshTokenNotValidException extends UnauthorizedException {
  constructor() {
    super(`Refresh token not valid`);
  }
}

import { BadRequestException } from '@nestjs/common';

export class RefreshTokenNotValidException extends BadRequestException {
  constructor() {
    super(`Refresh token not valid`);
  }
}

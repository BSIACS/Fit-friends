import { NotAcceptableException } from '@nestjs/common';

export class UnconsistentTokenException extends NotAcceptableException {
  constructor() {
    super(`Token is unconsistent`);
  }
}

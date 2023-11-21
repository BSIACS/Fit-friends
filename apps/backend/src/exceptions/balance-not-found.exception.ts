import { NotFoundException } from '@nestjs/common';

export class BalanceNotFoundException extends NotFoundException {
  constructor() {
    super(`Balance data for this training was not found for this user`);
  }
}

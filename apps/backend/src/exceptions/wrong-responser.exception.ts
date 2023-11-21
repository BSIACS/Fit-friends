import { BadRequestException } from '@nestjs/common';

export class WrongResponserException extends BadRequestException {
  constructor(id: string) {
    super(`User with id <${id}> is not correct responser`);
  }
}

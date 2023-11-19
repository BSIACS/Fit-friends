import { NotFoundException } from '@nestjs/common';

export class PersonalTrainingRequestDoesNotExistsException extends NotFoundException {
  constructor(id: string) {
    super(`Personal training request with ${id} does not exists`);
  }
}

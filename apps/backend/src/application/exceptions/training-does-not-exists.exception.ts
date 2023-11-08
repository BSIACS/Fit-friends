import { NotFoundException } from '@nestjs/common';

export class TrainingDoesNotExistsException extends NotFoundException {
  constructor(paramData: string, paramName: string) {
    super(`Training with ${paramName} <${paramData}> does not exists`);
  }
}

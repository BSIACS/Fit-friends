import { Injectable } from '@nestjs/common';
import { TrainingEntityInterface } from './training-entity.interface';
import { UUID } from '../../types/uuid.type';
import { TrainingsRepository } from './trainings.repository';
import { TrainingDoesNotExistsException } from '../exceptions/training-does-not-exists.exception';



@Injectable()
export class TrainingsService {

  constructor(private readonly trainingsRepository: TrainingsRepository) { }

  public async findTrainingById(id: UUID): Promise<TrainingEntityInterface | null> {
    const foundTraining = await this.trainingsRepository.findTrainingById(id)

    if (!foundTraining) {
      throw new TrainingDoesNotExistsException(id, 'id');
    }

    return foundTraining;
  }


}

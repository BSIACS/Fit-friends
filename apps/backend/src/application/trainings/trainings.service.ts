import { Injectable, NotFoundException } from '@nestjs/common';
import { TrainingEntityInterface } from './training-entity.interface';
import { UUID } from '../../types/uuid.type';
import { TrainingsRepository } from './trainings.repository';
import { TrainingDoesNotExistsException } from '../exceptions/training-does-not-exists.exception';
import { GetTrainingsCatalogueQuery } from './query/get-trainings-catalogue.query';



@Injectable()
export class TrainingsService {

  constructor(private readonly trainingsRepository: TrainingsRepository) { }

  public async findTrainingById(id: UUID): Promise<TrainingEntityInterface | null> {
    const foundTraining = await this.trainingsRepository.findTrainingById(id);

    if (!foundTraining) {
      throw new TrainingDoesNotExistsException(id, 'id');
    }

    return foundTraining;
  }

  public async findTrainings(query: GetTrainingsCatalogueQuery): Promise<TrainingEntityInterface[]> {
    const foundTrainings = await this.trainingsRepository.findTrainings(query);

    if (!foundTrainings) {
      throw new NotFoundException();
    }

    return foundTrainings;
  }

}

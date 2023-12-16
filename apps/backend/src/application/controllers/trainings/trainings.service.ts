import { Injectable, NotFoundException } from '@nestjs/common';
import { TrainingEntityInterface } from './training-entity.interface';
import { UUID } from '../../../types/uuid.type';
import { TrainingsRepository } from '../../prisma/trainings.repository';
import { TrainingDoesNotExistsException } from '../../../exceptions/training-does-not-exists.exception';
import { GetTrainingsCatalogueQuery } from './query/get-trainings-catalogue.query';
import { TrainingWithUserDataEntityInterface } from './entities/training-with-user-data-entity.interface';



@Injectable()
export class TrainingsService {

  constructor(private readonly trainingsRepository: TrainingsRepository) { }

  public async findTrainingById(id: UUID): Promise<TrainingWithUserDataEntityInterface> {
    const foundTraining = await this.trainingsRepository.findTrainingById(id);

    if (!foundTraining) {
      throw new TrainingDoesNotExistsException(id, 'id');
    }

    return foundTraining;
  }

  public async findTrainingByTrainerId(id: UUID): Promise<TrainingEntityInterface[]> {
    const foundTrainings = await this.trainingsRepository.findTrainingsByCreatorId(id);

    return foundTrainings;
  }

  public async findTrainings(query: GetTrainingsCatalogueQuery): Promise<TrainingEntityInterface[]> {
    const foundTrainings = await this.trainingsRepository.findTrainings(query);

    if (!foundTrainings) {
      throw new NotFoundException();
    }

    return foundTrainings;
  }

}

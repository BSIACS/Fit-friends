import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TrainingsRepository } from '../trainings/trainings.repository';
import { UUID } from '../../types/uuid.type';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { PurchasesRepository } from '../purchases/purchases.repository';

@Injectable()
export class TrainerAccountService {

  constructor(private trainingsRepository: TrainingsRepository, private purchasesRepository: PurchasesRepository) { }

  public findTrainingById(id: UUID) {
    const foundTraining = this.trainingsRepository.findTrainingById(id);

    return foundTraining;
  }

  public createTraining(dto: CreateTrainingDto) {
    let createdTraining;

    try {
      createdTraining = this.trainingsRepository.createTraining(dto);
    } catch (error) {
      throw new HttpException('message', HttpStatus.BAD_REQUEST)
    }

    return createdTraining;
  }

  public updateTraining(dto: UpdateTrainingDto) {
    let createdTraining;

    try {
      createdTraining = this.trainingsRepository.updateTraining(dto);
    } catch (error) {
      throw new HttpException('message', HttpStatus.BAD_REQUEST)
    }

    return createdTraining;
  }

  public async getTrainingList(id: UUID) {
    let trainingList;

    try {
      trainingList = await this.trainingsRepository.findTrainingsByCreatorId(id);
    } catch (error) {
      throw new HttpException('message', HttpStatus.BAD_REQUEST)
    }

    return trainingList;
  }

  public async getTrainingIds(id: UUID) {
    let trainingIds;

    try {
      trainingIds = await this.trainingsRepository.findTrainingIdsByCreatorId(id);
    } catch (error) {
      throw new HttpException('message', HttpStatus.BAD_REQUEST)
    }

    return trainingIds;
  }

  public async getPurchasesByTrainerId(id: UUID) {
    let trainingIds;
    let foundPurchases;


    try {
      trainingIds = await this.trainingsRepository.findTrainingIdsByCreatorId(id);
    } catch (error) {
      throw new HttpException('message', HttpStatus.BAD_REQUEST)
    }

    try {
      foundPurchases = await this.purchasesRepository.getPurchasesByTrainingIds(trainingIds);
    } catch (error) {
      throw new HttpException('message', HttpStatus.BAD_REQUEST)
    }

    return foundPurchases;
  }

}

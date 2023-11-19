import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { TrainingsRepository } from '../trainings/trainings.repository';
import { UUID } from '../../../types/uuid.type';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { PurchasesRepository } from '../../purchases/purchases.repository';
import { GetTrainingsListQuery } from './query/get-trainings-list.query';
import { NewTrainingsScheduledNotificationsRepository } from '../../new-trainings-scheduled-notifications/new-trainings-scheduled-notifications.repository';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class TrainerAccountService {

  constructor(
    private trainingsRepository: TrainingsRepository,
    private purchasesRepository: PurchasesRepository,
    private newTrainingScheduledNotificationRepository: NewTrainingsScheduledNotificationsRepository,
    private usersRepository: UsersRepository,

    ) { }

  public async findTrainingById(id: UUID) {
    const foundTraining = await this.trainingsRepository.findTrainingById(id);

    return foundTraining;
  }

  public async createTraining(dto: CreateTrainingDto, videoDemoFileName: string) {
    let createdTraining;
    console.log('asdsadsad');

    try {
      createdTraining = await this.trainingsRepository.createTraining(dto, videoDemoFileName);
    } catch (error) {
      throw new HttpException('message', HttpStatus.BAD_REQUEST)
    }

    return createdTraining;
  }

  public async updateTraining(dto: UpdateTrainingDto) {
    let createdTraining;

    try {
      createdTraining = await this.trainingsRepository.updateTraining(dto);
    } catch (error) {
      throw new HttpException('message', HttpStatus.BAD_REQUEST)
    }

    return createdTraining;
  }

  public async getTrainingList(id: UUID, filter: GetTrainingsListQuery) {
    let trainingList;

    try {
      trainingList = await this.trainingsRepository.findTrainingsByCreatorId(id, filter);
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

  public async createNewTrainingScheduledNotification(trainerId: UUID, trainingId: UUID) {
    let createdNotification;

    const subscribers = await this.usersRepository.findSubscribersIds(trainerId);

    if(!subscribers || subscribers.length === 0){
      return undefined;
    }

    try {
      createdNotification = await this.newTrainingScheduledNotificationRepository.createNewTrainingScheduledNotification(trainerId, trainingId, subscribers);
    } catch (error) {
      return undefined;
    }

    return createdNotification;
  }

  public async removeNewTrainingScheduledNotification(trainerId: UUID, trainingId: UUID): Promise<void> {
    try {
      await this.newTrainingScheduledNotificationRepository.removeNewTrainingScheduledNotification(trainerId, trainingId);
    } catch (error) {
      return undefined;
    }

    return;
  }

  public async getSubscribersIdsForNotifications(trainerId: UUID, trainingId: UUID): Promise<string[]>{
    let subscribersIds;

    try {
      subscribersIds = (await this.newTrainingScheduledNotificationRepository.getNewTrainingScheduledNotification(trainerId, trainingId)).subscribers;
    } catch (error) {
      throw new NotFoundException();
    }

    return subscribersIds;
  }
}

import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { TrainingsRepository } from '../../prisma/trainings.repository';
import { UUID } from '../../../types/uuid.type';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { PurchasesRepository } from '../../prisma/purchases.repository';
import { GetTrainingsListQuery } from './query/get-trainings-list.query';
import { NewTrainingsScheduledNotificationsRepository } from '../../prisma/new-trainings-scheduled-notifications.repository';
import { UsersRepository } from '../../prisma/users.repository';
import { UserDoesNotExistsException } from '../../../exceptions/user-does-not-exists.exception';
import { UserEntityInterface } from '../../../entities/user-entity.interface';
import { TrainerEntityInterface } from '../../../entities/trainer-entity.interface';
import { GetOrdersQuery } from './query/get-orders-list.query';
import { OrderEntityInterface } from '../../../entities/order-entity.interface';
import { TrainingEntityInterface } from '../trainings/training-entity.interface';
import { OrderRdo } from './rdo/order.rdo';

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

  public async getTrainingsList(id: UUID, filter: GetTrainingsListQuery) {
    let trainingList;
    let count;

    try {
      trainingList = await this.trainingsRepository.findTrainingsByCreatorId(id, filter);
    } catch (error) {
      throw new HttpException('message', HttpStatus.BAD_REQUEST)
    }

    try {
      count = await this.trainingsRepository.getTrainingsCountByCreatorId(id, filter);
    } catch (error) {
      throw new HttpException('message', HttpStatus.BAD_REQUEST)
    }

    return { trainingList, count };
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
/**
 * Возвращает агрегированную коллекцию проданных тренировок включая данные о тренировке,
 * количестве купленных тренировок и общую сумму,
 * на которые данная тренировка была продана
 */
  public async getOdersByTrainerId(id: UUID, query: GetOrdersQuery) {
    let trainings: TrainingEntityInterface[];
    let foundOrders: OrderEntityInterface[];
    let ordersCount: number;


    try {
      trainings = await this.trainingsRepository.findTrainingsByCreatorId(id);
    } catch (error) {
      throw new HttpException('message 1', HttpStatus.BAD_REQUEST);
    }

    const trainingsIds: string[] = trainings.map((training) => training.id);

    try {
      foundOrders = await this.purchasesRepository.getOrdersByTrainingsIds(trainingsIds, query);
    } catch (error) {
      throw new HttpException('message 2', HttpStatus.BAD_REQUEST);
    }

    try {
      ordersCount = await this.purchasesRepository.getOrdersCountByTrainingsIds(trainingsIds);
    } catch (error) {
      throw new HttpException('message', HttpStatus.BAD_REQUEST);
    }

    let ordersRdo = [];

    trainings.forEach((item) => {
      let totalPurchased = 0;
      let totalPaid = 0;

      foundOrders.forEach((order) => {
        if(order.trainingId === item.id){
          totalPurchased += order.quantity;
          totalPaid += order.totalPrice;
        }
      });

      if(totalPurchased > 0){
        ordersRdo.push(
          {
            id: item.id,
            totalPurchased: totalPurchased,
            totalPaid: totalPaid,
            training: item,
          }
        );
      }
    });

    ordersRdo = this.sortOrders(ordersRdo, query.sortBy, query.sortDirection);

    return {
      ordersRdo,
      ordersCount};
  }

  private sortOrders(orders: OrderRdo[], sortBy: string, sortDirection): OrderRdo[]{
    if(sortBy === 'SUM'){
      if(sortDirection === 'asc'){
        return orders.sort((order_1, order_2) => order_1.totalPaid - order_2.totalPaid);
      }
      else{
        return orders.sort((order_1, order_2) => order_2.totalPaid - order_1.totalPaid);
      }
    }
    else if(sortBy === 'QUANTITY'){
      if(sortDirection === 'asc'){
        return orders.sort((order_1, order_2) => order_1.totalPurchased - order_2.totalPurchased);
      }
      else{
        return orders.sort((order_1, order_2) => order_2.totalPurchased - order_1.totalPurchased);
      }
    }
  }

  public async createNewTrainingScheduledNotification(trainerId: UUID, trainingId: UUID) {
    let createdNotification;

    const subscribers = await this.usersRepository.findSubscribersIds(trainerId);

    if (!subscribers || subscribers.length === 0) {
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

  public async getSubscribersIdsForNotifications(trainerId: UUID, trainingId: UUID): Promise<string[]> {
    let subscribersIds;

    try {
      subscribersIds = (await this.newTrainingScheduledNotificationRepository.getNewTrainingScheduledNotification(trainerId, trainingId)).subscribers;
    } catch (error) {
      throw new NotFoundException();
    }

    return subscribersIds;
  }

  public async getFriendList(id: UUID, friendsPerPage: number | undefined, pageNumber: number | undefined): Promise<(UserEntityInterface | TrainerEntityInterface)[]> {
    const foundUser = await this.usersRepository.findTrainerById(id);

    if (!foundUser) {
      throw new UserDoesNotExistsException(id, 'id');
    }

    const foundUserFriends = await this.usersRepository.findTrainersFriends(id, friendsPerPage, pageNumber)

    return foundUserFriends;
  }

  public async getFriendsNumber(id: UUID): Promise<number> {
    const foundTrainer = await this.usersRepository.findTrainerById(id);

    return foundTrainer.friends.length;
  }
}

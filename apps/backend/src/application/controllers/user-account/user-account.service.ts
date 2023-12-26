import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../../prisma/users.repository';
import { UUID } from '../../../types/uuid.type';
import { UserEntityInterface } from '../../../entities/user-entity.interface';
import { UserDoesNotExistsException } from '../../../exceptions/user-does-not-exists.exception';
import { AlreadyAddedToFriendsList } from '../../../exceptions/already-added-to-friends-list.exception';
import { NotFoundInFriendsList } from '../../../exceptions/not-found-in-friends-list.exception';
import { UserBalanceRepository } from '../../prisma/user-balance.repository';
import { UserBalanceEntityInterface } from '../../../entities/user-balance-entity.interface';
import { TrainingsRepository } from '../../prisma/trainings.repository';
import { TrainingDoesNotExistsException } from '../../../exceptions/training-does-not-exists.exception';
import { BalanceNotFoundException } from '../../../exceptions/balance-not-found.exception';
import { TrainerEntityInterface } from '../../../entities/trainer-entity.interface';
import { UserRoleEnum } from '../../../types/user-role.enum';
import { PurchasesRepository } from '../../prisma/purchases.repository';
import { CreatePurchaseDto } from '../../prisma/create-purchase.dto';

@Injectable()
export class UserAccountService {

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userBalanceRepository: UserBalanceRepository,
    private readonly trainingsRepository: TrainingsRepository,
    private purchasesRepository: PurchasesRepository,
  ) { }

  public async getFriendList(id: UUID, friendsPerPage: number | undefined, pageNumber: number | undefined): Promise<(UserEntityInterface | TrainerEntityInterface)[]> {
    const foundUser = await this.usersRepository.findUserById(id);

    if (!foundUser) {
      throw new UserDoesNotExistsException(id, 'id');
    }

    const foundUserFriends = await this.usersRepository.findUsersFriends(id, friendsPerPage, pageNumber)

    return foundUserFriends;
  }

  public async getFriendsNumber(id: UUID): Promise<number> {
    const foundUserIds = await this.usersRepository.findFriendsIds(id);

    return foundUserIds.length;
  }

  public async addToFriendsList(id, newFriendId): Promise<void> {
    const foundUser = await this.usersRepository.findUserById(id);

    if (!foundUser) {
      throw new UserDoesNotExistsException(id, 'id');
    }

    let foundNewFriend: UserEntityInterface | TrainerEntityInterface = await this.usersRepository.findUserById(newFriendId);

    if (!foundNewFriend) {
      foundNewFriend = await this.usersRepository.findTrainerById(newFriendId);
    }

    if (!foundNewFriend) {
      throw new UserDoesNotExistsException(newFriendId, 'id');
    }

    const foundFriendsIds = await this.usersRepository.findFriendsIds(id);

    if (foundFriendsIds.includes(newFriendId)) {
      throw new AlreadyAddedToFriendsList(newFriendId);
    }

    await this.usersRepository.addUserToUserFriendsList(id, newFriendId);

    if (foundNewFriend.role === UserRoleEnum.USER) {
      await this.usersRepository.addUserToUserFriendsList(newFriendId, id);
    }
    else{
      await this.usersRepository.addUserToTrainerFriendsList(newFriendId, id);
    }
  }

  public async removeFromFriendsList(id, friendId): Promise<void> {
    const foundUser = await this.usersRepository.findUserById(id);

    if (!foundUser) {
      throw new UserDoesNotExistsException(id, 'id');
    }

    let foundNewFriend: UserEntityInterface | TrainerEntityInterface = await this.usersRepository.findUserById(friendId);

    if (!foundNewFriend) {
      foundNewFriend = await this.usersRepository.findTrainerById(friendId);
    }

    if (!foundNewFriend) {
      throw new UserDoesNotExistsException(friendId, 'id');
    }

    const foundFriendsIds = await this.usersRepository.findFriendsIds(id);

    if (!foundFriendsIds.includes(friendId)) {
      throw new NotFoundInFriendsList(friendId);
    }

    await this.usersRepository.removeUserFromUsersFriendsList(id, friendId);

    if (foundNewFriend.role === UserRoleEnum.USER) {
      await this.usersRepository.removeUserFromUsersFriendsList(friendId, id);
    }
    else{
      await this.usersRepository.removeUserFromTrainersFriendsList(friendId, id);
    }
  }

  public async getUserBalance(id: UUID): Promise<UserBalanceEntityInterface[]> {
    const foundUser = await this.usersRepository.findUserById(id);

    if (!foundUser) {
      throw new UserDoesNotExistsException(id, 'id');
    }

    const foundUserBalance = await this.userBalanceRepository.getUserBalance(id)

    return foundUserBalance;
  }

  public async addToBalance(id: UUID, trainingId: UUID, quantity: number): Promise<void> {
    const foundUser = await this.usersRepository.findUserById(id);

    if (!foundUser) {
      throw new UserDoesNotExistsException(id, 'id');
    }

    const foundTraining = await this.trainingsRepository.findTrainingById(trainingId);

    if (!foundTraining) {
      throw new TrainingDoesNotExistsException(id, 'id');
    }
    const foundBalance = await this.userBalanceRepository.findInBalanceByTrainingId(id, trainingId);

    if (foundBalance) {
      await this.userBalanceRepository.updateInUserBalance(id, trainingId, foundBalance.remained + quantity)

      return;
    }

    await this.userBalanceRepository.addToUserBalance(id, trainingId, quantity);

    return;
  }

  public async removeFromBalance(id: UUID, trainingId: UUID, quantity: number): Promise<void> {
    const foundUser = await this.usersRepository.findUserById(id);

    if (!foundUser) {
      throw new UserDoesNotExistsException(id, 'id');
    }

    const foundTraining = await this.trainingsRepository.findTrainingById(trainingId);

    if (!foundTraining) {
      throw new TrainingDoesNotExistsException(id, 'id');
    }

    const foundBalance = await this.userBalanceRepository.findInBalanceByTrainingId(id, trainingId);

    if (!foundBalance) {
      throw new BalanceNotFoundException();
    }

    await this.userBalanceRepository.updateInUserBalance(id, trainingId, foundBalance.remained - quantity)
  }

  public async addPurchase(userId: UUID, dto: CreatePurchaseDto): Promise<void> {
    try {
      this.purchasesRepository.createPurchase(userId, dto);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}

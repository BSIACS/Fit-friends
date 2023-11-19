import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { UUID } from '../../../types/uuid.type';
import { UserEntityInterface } from '../users/user-entity.interface';
import { UserDoesNotExistsException } from '../../../exceptions/user-does-not-exists.exception';
import { AlreadyAddedToFriendsList } from '../../../exceptions/already-added-to-friends-list.exception';
import { NotFoundInFriendsList } from '../../../exceptions/not-found-in-friends-list.exception';
import { UserBalanceRepository } from '../../user-balance/user-balance.repository';
import { UserBalanceEntityInterface } from '../../user-balance/entities/user-balance-entity.interface';
import { TrainingsRepository } from '../trainings/trainings.repository';
import { TrainingDoesNotExistsException } from '../../../exceptions/training-does-not-exists.exception';
import { BalanceNotFoundException } from '../../../exceptions/balance-not-found.exception';

@Injectable()
export class UserAccountService {

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userBalanceRepository: UserBalanceRepository,
    private readonly trainingsRepository: TrainingsRepository,
    ) { }

  public async getFriendList(id: UUID): Promise<UserEntityInterface[]> {
    const foundUser = await this.usersRepository.findUserById(id);

    if (!foundUser) {
      throw new UserDoesNotExistsException(id, 'id');
    }

    const foundUserFriends = await this.usersRepository.findFriends(id)

    return foundUserFriends;
  }

  public async addToFriendsList(id, newFriendId): Promise<void> {
    const foundUser = await this.usersRepository.findUserById(id);

    if (!foundUser) {
      throw new UserDoesNotExistsException(id, 'id');
    }

    const foundNewFriend = await this.usersRepository.findUserById(newFriendId);

    if (!foundNewFriend) {
      throw new UserDoesNotExistsException(newFriendId, 'id');
    }

    const foundFriendsIds = await this.usersRepository.findFriendsIds(id);

    if (foundFriendsIds.includes(newFriendId)) {
      throw new AlreadyAddedToFriendsList(newFriendId);
    }

    await this.usersRepository.addToFriendsList(id, newFriendId);
  }

  public async removeFromFriendsList(id, friendId): Promise<void> {
    const foundUser = await this.usersRepository.findUserById(id);

    if (!foundUser) {
      throw new UserDoesNotExistsException(id, 'id');
    }

    const foundFriendsIds = await this.usersRepository.findFriendsIds(id);

    if (!foundFriendsIds.includes(friendId)) {
      throw new NotFoundInFriendsList(friendId);
    }

    await this.usersRepository.removeFromFriendsList(id, friendId);
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
    console.log('=======', foundUser);

    if (!foundUser) {
      throw new UserDoesNotExistsException(id, 'id');
    }

    const foundTraining = await this.trainingsRepository.findTrainingById(trainingId);

    if (!foundTraining) {
      throw new TrainingDoesNotExistsException(id, 'id');
    }
    console.log('=======', foundTraining);
    const foundBalance = await this.userBalanceRepository.findInBalanceByTrainingId(id, trainingId);

    if(foundBalance){
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

    if(!foundBalance){
      throw new BalanceNotFoundException();
    }

    if(foundBalance.remained <= quantity){
      await this.userBalanceRepository.removeFromUserBalance(id, trainingId);
    }

    await this.userBalanceRepository.updateInUserBalance(id, trainingId, foundBalance.remained - quantity)
  }
}

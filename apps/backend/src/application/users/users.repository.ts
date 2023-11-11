import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { PrismaService } from '../prisma/prisma.service';
import { setPasswordHash } from '../../utils/password.util';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUID } from '../../types/uuid.type';
import { TrainerEntityInterface } from './trainer-entity.interface';
import { UserEntityInterface } from './user-entity.interface';
import { GetUsersListQuery } from './query/get-users-list.query';
import { GetUsersFilterParams } from './query/get-users-filter-params.interface';
import { GetUsersSortParams } from './query/get-users-sort-params.interface';
import { UserRoleEnum } from '../../types/user-role.enum';


@Injectable()
export class UsersRepository {

  constructor(private readonly prisma: PrismaService) { }

  public async findTrainerById(id: UUID): Promise<TrainerEntityInterface> {
    const foundUser: TrainerEntityInterface | null = await this.prisma.trainer.findFirst({
      where: {
        id: id,
      }
    });

    return foundUser;
  }

  public async findUserById(id: UUID): Promise<UserEntityInterface> {
    const foundUser = await this.prisma.user.findFirst({
      where: {
        id: id,
      }
    });

    return foundUser;
  }

  public async findUsersEmailsByIds(ids: UUID[]): Promise<string[]> {
    const foundUsersEmails = (await this.prisma.user.findMany({
      where: {
        id: {
          in: ids
        }
      },
      select: {
        email: true
      }
    })).map((user) => user.email);

    return foundUsersEmails;
  }

  public async findTrainerByEmail(email: string): Promise<TrainerEntityInterface> {
    const foundUser: TrainerEntityInterface = await this.prisma.trainer.findFirst({
      where: {
        email: email,
      }
    });

    return foundUser;
  }

  public async findUserByEmail(email: string) {
    const foundUser = await this.prisma.user.findFirst({
      where: {
        email: email,
      }
    });

    return foundUser;
  }

  public async createTrainer(dto: CreateTrainerDto): Promise<TrainerEntityInterface | null> {
    const passwordHash = await setPasswordHash(dto.password);

    const createdTrainer: TrainerEntityInterface | null = await this.prisma.trainer.create({
      data: {
        name: dto.name,
        email: dto.email,
        avatarFileName: '',
        passwordHash: passwordHash,
        sex: dto.sex,
        birthDate: new Date(dto.birthDate),
        role: UserRoleEnum.TRAINER,
        description: dto.description,
        location: dto.location,
        backgroundImgFileName: '',
        createdAt: new Date(),
        trainingLevel: dto.trainingLevel,
        trainingType: dto.trainingType,
        certificateFileName: '',
        merits: dto.merits,
        isReadyForTraining: dto.isReadyForTraining,
      }
    });

    return createdTrainer;
  }

  public async createUser(dto: CreateUserDto, avatarFileName: string, backgroundImgFileName: string): Promise<UserEntityInterface> {
    const passwordHash = await setPasswordHash(dto.password);

    const createdUser = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        avatarFileName: avatarFileName,
        passwordHash: passwordHash,
        sex: dto.sex,
        birthDate: new Date(dto.birthDate),
        role: UserRoleEnum.USER,
        description: dto.description,
        location: dto.location,
        backgroundImgFileName: backgroundImgFileName,
        createdAt: new Date(),
        trainingLevel: dto.trainingLevel,
        trainingType: dto.trainingType,
        trainingDuration: dto.trainingDuration,
        calories: +dto.calories,
        caloriesPerDay: +dto.caloriesPerDay,
        isReadyForTraining: dto.isReadyForTraining === 'false' ? false : true
      }
    });

    return createdUser;
  }

  public async updateTrainer(dto: UpdateTrainerDto): Promise<TrainerEntityInterface | null> {
    const updatedTrainer: TrainerEntityInterface | null = await this.prisma.trainer.update({
      where: {
        id: dto.id
      },
      data: dto
    });

    return updatedTrainer;
  }

  public async updateUser(dto: UpdateUserDto): Promise<UserEntityInterface | null> {
    const updatedUser: UserEntityInterface | null = await this.prisma.user.update({
      where: {
        id: dto.id
      },
      data: dto
    });

    return updatedUser;
  }

  public async findTrainerDetail(id: UUID): Promise<TrainerEntityInterface | null> {
    const foundUser: TrainerEntityInterface | null  = await this.prisma.trainer.findFirst({
      where: {
        id: id,
      }
    });

    return foundUser;
  }

  public async findUserDetail(id: UUID): Promise<UserEntityInterface | null> {
    const foundUser = await this.prisma.user.findFirst({
      where: {
        id: id
      }
    });

    return foundUser;
  }

  public async findUsers(filterParams: GetUsersFilterParams, sortParams: GetUsersSortParams) {
    const foundUsers = await this.prisma.user.findMany({
      where: {
        location: filterParams.location ? filterParams.location : undefined,
        trainingLevel: filterParams.trainingLevel ? filterParams.trainingLevel : undefined,
        trainingType: filterParams.trainingType ? { hasSome: filterParams.trainingType} : undefined,
      }
    });

    return foundUsers;
  }

  public async findTrainers(filterParams: GetUsersFilterParams, sortParams: GetUsersSortParams) {
    const foundTrainers = await this.prisma.trainer.findMany({
      where: {
        location: filterParams.location ? filterParams.location : undefined,
        trainingLevel: filterParams.trainingLevel ? filterParams.trainingLevel : undefined,
        trainingType: filterParams.trainingType ? { hasSome: filterParams.trainingType} : undefined,
      }
    });

    return foundTrainers;
  }

  public async findFriendsIds(id: UUID): Promise<string[]> {
    const foundFriendsIds = (await this.prisma.user.findFirst({
      where: {
        id: id
      },
      select: {
        friends: true
      }
    })).friends;

    return foundFriendsIds;
  }

  public async findSubscribersIds(id: UUID): Promise<UUID[]> {
    const foundSubscribersIds = (await this.prisma.trainer.findFirst({
      where: {
        id: id
      },
      select: {
        subscribers: true
      }
    })).subscribers;

    return foundSubscribersIds;
  }

  public async findFriends(id: UUID): Promise<any> {
    const foundFriendsIds = (await this.prisma.user.findFirst({
      where: {
        id: id
      },
      select: {
        friends: true
      }
    })).friends;

    const foundFriends = await this.prisma.user.findMany({
      where: {
        id: {
          in: foundFriendsIds
        }
      }
    });

    return foundFriends;
  }

  public async addToFriendsList(userId: UUID, newFriendId: UUID): Promise<void>{
    const foundFriendsIds = (await this.prisma.user.findFirst({
      where: {
        id: userId
      },
      select: {
        friends: true
      }
    })).friends;

    foundFriendsIds.push(newFriendId);

    await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        friends: foundFriendsIds
      }
    })
  }

  public async removeFromFriendsList(userId: UUID, friendId: UUID): Promise<void>{
    const foundFriendsIds = (await this.prisma.user.findFirst({
      where: {
        id: userId
      },
      select: {
        friends: true
      }
    })).friends;

    const elementToRemoveIndex = foundFriendsIds.indexOf(friendId);

    if(elementToRemoveIndex < 0){
      return;
    }

    foundFriendsIds.splice(elementToRemoveIndex, 1);

    await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        friends: foundFriendsIds
      }
    })
  }

  public async addToSubscribers(trainerId: UUID, newSubscriberId: UUID): Promise<void>{
    const foundSubscribersIds = (await this.prisma.trainer.findFirst({
      where: {
        id: trainerId
      },
      select: {
        subscribers: true
      }
    })).subscribers;

    foundSubscribersIds.push(newSubscriberId);

    await this.prisma.trainer.update({
      where: {
        id: trainerId
      },
      data: {
        subscribers: foundSubscribersIds
      }
    })
  }

  public async removeFromSubscribers(trainerId: UUID, subscriberId: UUID): Promise<void>{
    const foundFriendsIds = (await this.prisma.trainer.findFirst({
      where: {
        id: trainerId
      },
      select: {
        subscribers: true
      }
    })).subscribers;

    const elementToRemoveIndex = foundFriendsIds.indexOf(subscriberId);

    if(elementToRemoveIndex < 0){
      return;
    }

    foundFriendsIds.splice(elementToRemoveIndex, 1);

    await this.prisma.trainer.update({
      where: {
        id: trainerId
      },
      data: {
        subscribers: foundFriendsIds
      }
    })
  }

}

import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateUserDto } from '../controllers/users/dto/create-user.dto';
import { CreateTrainerDto } from '../controllers/users/dto/create-trainer.dto';
import { PrismaService } from './prisma.service';
import { setPasswordHash } from '../../utils/password.util';
import { UpdateTrainerDto } from '../controllers/users/dto/update-trainer.dto';
import { UpdateUserDto } from '../controllers/users/dto/update-user.dto';
import { UUID } from '../../types/uuid.type';
import { TrainerEntityInterface } from '../../entities/trainer-entity.interface';
import { UserEntityInterface } from '../../entities/user-entity.interface';
import { GetUsersFilterParams } from '../controllers/users/query/get-users-filter-params.interface';
import { GetUsersSortParams } from '../controllers/users/query/get-users-sort-params.interface';
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

  public async createTrainer(dto: CreateTrainerDto, avatarFileName: string): Promise<TrainerEntityInterface | null> {
    const passwordHash = await setPasswordHash(dto.password);

    const createdTrainer: TrainerEntityInterface | null = await this.prisma.trainer.create({
      data: {
        name: dto.name,
        email: dto.email,
        avatarFileName: avatarFileName,
        passwordHash: passwordHash,
        sex: dto.sex,
        birthDate: new Date(dto.birthDate),
        role: UserRoleEnum.TRAINER,
        description: '',
        location: dto.location,
        backgroundImgFileName: '',
        createdAt: new Date(),
        trainingLevel: '',
        trainingType: [],
        certificateFileName: '',
        merits: '',
        isReadyForTraining: false,
      }
    });

    return createdTrainer;
  }

  public async createUser(dto: CreateUserDto, avatarFileName: string): Promise<UserEntityInterface> {
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
        description: '',
        location: dto.location,
        backgroundImgFileName: '',
        createdAt: new Date(),
        trainingLevel: '',
        trainingType: [],
        trainingDuration: '',
        calories: 0,
        caloriesPerDay: 0,
        isReadyForTraining: false
      }
    });

    return createdUser;
  }

  public async updateTrainer(dto: UpdateTrainerDto, certificateFileName: string): Promise<TrainerEntityInterface> {
    const updatedTrainer: TrainerEntityInterface | null = await this.prisma.trainer.update({
      where: {
        id: dto.id,
        certificateFileName: certificateFileName ? certificateFileName : ''
      },
      data: dto
    });

    return updatedTrainer;
  }

  public async updateUser(dto: UpdateUserDto): Promise<UserEntityInterface> {
    console.log(dto);

    const updatedUser: UserEntityInterface | null = await this.prisma.user.update({
      where: {
        id: dto.id
      },
      data: {
        calories: dto.caloriesPerDay
      }
    });

    return updatedUser;
  }

  public async findTrainerDetail(id: UUID): Promise<TrainerEntityInterface> {
    const foundUser: TrainerEntityInterface = await this.prisma.trainer.findFirst({
      where: {
        id: id,
      }
    });

    return foundUser;
  }

  public async findUserDetail(id: UUID): Promise<UserEntityInterface> {
    const foundUser = await this.prisma.user.findFirst({
      where: {
        id: id
      }
    });

    return foundUser;
  }

  public async findUsers(filterParams: GetUsersFilterParams, sortParams: GetUsersSortParams): Promise<UserEntityInterface[]> {
    console.log('filterParams.trainingLevel -- ', filterParams.trainingLevel);


    const foundUsers = await this.prisma.user.findMany({
      where: {
        location: {
          in: filterParams.locations ? filterParams.locations : undefined
        },
        trainingType: filterParams.trainingType ? { hasSome: filterParams.trainingType } : undefined,
        trainingLevel: filterParams.trainingLevel,
      }
    });

    return foundUsers;
  }

  public async findTrainers(filterParams: GetUsersFilterParams, sortParams: GetUsersSortParams): Promise<TrainerEntityInterface[]> {
    const foundTrainers = await this.prisma.trainer.findMany({
      where: {
        location: {
          in: filterParams.locations ? filterParams.locations : undefined
        },
        trainingType: filterParams.trainingType ? { hasSome: filterParams.trainingType } : undefined,
        trainingLevel: filterParams.trainingLevel,
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

  public async findFriends(id: UUID, friendsPerPage: number | undefined, pageNumber: number | undefined): Promise<(UserEntityInterface | TrainerEntityInterface)[]> {
    let foundFriendsIds = (await this.prisma.user.findFirst({
      where: {
        id: id
      },
      select: {
        friends: true
      }
    })).friends;

    const indexStart = (friendsPerPage * pageNumber) - friendsPerPage;
    const indexStop = friendsPerPage * pageNumber;

    if(friendsPerPage && pageNumber){
      foundFriendsIds = foundFriendsIds.slice(indexStart, indexStop);
    }

    const foundUsers = await this.prisma.user.findMany({
      where: {
        id: {
          in: foundFriendsIds
        }
      }
    });

    const foundTrainers = await this.prisma.trainer.findMany({
      where: {
        id: {
          in: foundFriendsIds
        }
      }
    });

    const foundFriends = [...foundUsers, ... foundTrainers];

    return foundFriends;
  }

  public async addUserToUserFriendsList(userId: UUID, newFriendId: UUID): Promise<void> {
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

  public async removeUserFromUsersFriendsList(userId: UUID, friendId: UUID): Promise<void> {
    const foundFriendsIds = (await this.prisma.user.findFirst({
      where: {
        id: userId
      },
      select: {
        friends: true
      }
    })).friends;

    const elementToRemoveIndex = foundFriendsIds.indexOf(friendId);

    if (elementToRemoveIndex < 0) {
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

  public async addUserToTrainerFriendsList(trainerId: UUID, newFriendId: UUID): Promise<void> {
    const foundFriendsIds = (await this.prisma.trainer.findFirst({
      where: {
        id: trainerId
      },
      select: {
        friends: true
      }
    })).friends;

    foundFriendsIds.push(newFriendId);

    await this.prisma.trainer.update({
      where: {
        id: trainerId
      },
      data: {
        friends: foundFriendsIds
      }
    })
  }

  public async removeUserFromTrainersFriendsList(trainerId: UUID, friendId: UUID): Promise<void> {
    const foundFriendsIds = (await this.prisma.trainer.findFirst({
      where: {
        id: trainerId
      },
      select: {
        friends: true
      }
    })).friends;

    const elementToRemoveIndex = foundFriendsIds.indexOf(friendId);

    if (elementToRemoveIndex < 0) {
      return;
    }

    foundFriendsIds.splice(elementToRemoveIndex, 1);

    await this.prisma.trainer.update({
      where: {
        id: trainerId
      },
      data: {
        friends: foundFriendsIds
      }
    })
  }

  public async addToSubscribers(trainerId: UUID, newSubscriberId: UUID): Promise<void> {
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

  public async removeFromSubscribers(trainerId: UUID, subscriberId: UUID): Promise<void> {
    const foundFriendsIds = (await this.prisma.trainer.findFirst({
      where: {
        id: trainerId
      },
      select: {
        subscribers: true
      }
    })).subscribers;

    const elementToRemoveIndex = foundFriendsIds.indexOf(subscriberId);

    if (elementToRemoveIndex < 0) {
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

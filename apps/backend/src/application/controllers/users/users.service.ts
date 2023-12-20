import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UUID } from '../../../types/uuid.type';
import { VerifyUserDto } from './dto/verify-user.dto';
import { UsersRepository } from '../../prisma/users.repository';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../../../types/token-payload.interface';
import { RefreshTokenRepository } from '../../refresh-token/refresh-tokens.repository';
import { UserExistsException } from '../../../exceptions/user-exists.exception';
import { comparePassword } from '../../../utils/password.util';
import { UserPasswordWrongException } from '../../../exceptions/user-password-wrong.exception';
import { UserDoesNotExistsException } from '../../../exceptions/user-does-not-exists.exception';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { UserRoleEnum } from '../../../types/user-role.enum';
import { UnconsistentTokenException } from '../../../exceptions/unconsistent-token.exception';
import { GetUsersListQuery } from './query/get-users-list.query';
import { AlreadyAddedToSubscribers } from '../../../exceptions/already-added-to-subscribers.exception';
import { NotFoundInSubscribers } from '../../../exceptions/not-found-in-friends-list.exception copy';
import { UserEntityInterface } from '../../../entities/user-entity.interface';
import { ConfigService } from '@nestjs/config';
import { TrainerEntityInterface } from '../../../entities/trainer-entity.interface';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly configService: ConfigService,
  ) { }

  public async createUser(dto: CreateUserDto, avatarFileName: string): Promise<UserEntityInterface> {
    const foundUser = await this.usersRepository.findUserByEmail(dto.email);

    if (foundUser) {
      throw new UserExistsException(foundUser.email);
    }

    const ctreatedUser = this.usersRepository.createUser(dto, avatarFileName);

    return ctreatedUser;
  }

  public async createTrainer(dto: CreateTrainerDto,  avatarFileName: string): Promise<TrainerEntityInterface> {
    const foundUser = await this.usersRepository.findTrainerByEmail(dto.email);

    if (foundUser) {
      throw new UserExistsException(foundUser.email);
    }

    const ctreatedUser = this.usersRepository.createTrainer(dto, avatarFileName);

    return ctreatedUser;
  }

  public async isUserExist(email: string): Promise<boolean>{
    const foundTrainer = await this.usersRepository.findUserByEmail(email);

    return foundTrainer ? true : false;
  }

  public async isTrainerExist(email: string): Promise<boolean>{
    const foundTrainer = await this.usersRepository.findTrainerByEmail(email);

    return foundTrainer ? true : false;
  }

  public async generateTokens(userId: UUID, email: string, name: string, role: string) {
    const payload = {
      userId: userId,
      email: email,
      name: name,
      role: role,
    } as TokenPayload;

    const result = {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.refreshTokenSecret'),
        expiresIn: this.configService.get<string>('jwt.refreshTokenExpiresIn'),
      }),
    };

    await this.refreshTokenRepository.removeByUserId(userId)
    await this.refreshTokenRepository.create('', result.refreshToken)

    return result;
  }

  public async isRefreshTokenValid(id: UUID, refreshToken: string): Promise<boolean>{
    let activeRefreshToken = '';
    try{
      activeRefreshToken = await this.refreshTokenRepository.getActiveTokenByUserId(id);
    }
    catch{
      throw new BadRequestException();
    }


    return refreshToken === activeRefreshToken;
  }

  public async deleteRefreshToken(id: UUID): Promise<void>{
    await this.refreshTokenRepository.getActiveTokenByUserId(id);

    return;
  }

  public async getTokenPayload(token: string) {
    let payload;
    try {
      payload = await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new UnconsistentTokenException();
    }

    return payload;
  }

  public async verifyUser(dto: VerifyUserDto) {
    let foundUser: TrainerEntityInterface | UserEntityInterface = await this.usersRepository.findTrainerByEmail(dto.email);

    if (!foundUser) {
      foundUser = await this.usersRepository.findUserByEmail(dto.email);
    }

    if (!foundUser) {
      throw new UserDoesNotExistsException(dto.email, 'email');
    }

    const isPasswordCorrect = await comparePassword(dto.password, foundUser.passwordHash);

    if (!isPasswordCorrect) {
      throw new UserPasswordWrongException();
    }

    return foundUser;
  }

  public async getUserDetail(id: UUID): Promise<UserEntityInterface> {
    let foundUser = await this.usersRepository.findUserDetail(id);

    if(!foundUser){
      foundUser = await this.usersRepository.findUserDetail(id);
    }

    return foundUser;
  }

  public async getTrainerDetail(id: UUID): Promise<TrainerEntityInterface> {
    const foundTrainer = await this.usersRepository.findTrainerDetail(id);

    if(!foundTrainer){
      throw new UserDoesNotExistsException(id, 'id');
    }

    return foundTrainer;
  }

  public async updateUser(dto: UpdateUserDto, avatarFileName: string | undefined = undefined) {
    let updatedUser;
    try {
      updatedUser = await this.usersRepository.updateUser(dto, avatarFileName);
    } catch (error) {
      throw new UserDoesNotExistsException(dto.id, 'id');
    }

    return updatedUser;
  }

  public async updateTrainer(dto: UpdateTrainerDto, certificateFileName?: string): Promise<TrainerEntityInterface> {
    let updatedUser;
    try {
      updatedUser = await this.usersRepository.updateTrainer({...dto}, certificateFileName);
    } catch (error) {
      console.log(error);

      throw new UserDoesNotExistsException(dto.id, 'id');
    }

    return updatedUser;
  }

  public async isUserRole(id: UUID): Promise<boolean> {
    let foundUser;
    try {
      foundUser = await this.usersRepository.findUserById(id);
    } catch (error) {
      throw new UserDoesNotExistsException(id, 'id');
    }

    return foundUser.role === UserRoleEnum.USER;
  }

  public async isTrainerRole(id: UUID): Promise<boolean> {
    const foundTrainer = await this.usersRepository.findUserById(id);

    return foundTrainer.role === UserRoleEnum.TRAINER;
  }

  public async getUsersList(query: GetUsersListQuery): Promise<(UserEntityInterface | TrainerEntityInterface)[]>{
    let foundUsers;
    let foundTrainers;

    try {
      foundUsers = await this.usersRepository.findUsers({
        locations: query.locations, trainingLevel: query.trainingLevel, trainingType: query.trainingType
      }, {sortPriority: query.sortPriority});

      foundTrainers = await this.usersRepository.findTrainers({
        locations: query.locations, trainingLevel: query.trainingLevel, trainingType: query.trainingType
      }, {sortPriority: query.sortPriority});
    } catch (error) {
      throw new BadRequestException();
    }

    const result = query.sortPriority && query.sortPriority === UserRoleEnum.TRAINER ?
      [...foundTrainers, ...foundUsers] :
      [...foundUsers, ...foundTrainers];

    return result;
  }

  public async addToSubscribers(id, newSubscriberId): Promise<void> {
    const foundTrainer = await this.usersRepository.findTrainerById(id);

    if (!foundTrainer) {
      throw new UserDoesNotExistsException(id, 'id');
    }

    const foundNewSubscriber = await this.usersRepository.findUserById(newSubscriberId);

    if (!foundNewSubscriber) {
      throw new UserDoesNotExistsException(newSubscriberId, 'id');
    }

    const foundSubscribersIds = await this.usersRepository.findSubscribersIds(id);

    if (foundSubscribersIds.includes(newSubscriberId)) {
      throw new AlreadyAddedToSubscribers(newSubscriberId);
    }

    await this.usersRepository.addToSubscribers(id, newSubscriberId);
  }

  public async removeFromSubscribers(id, subscriberId): Promise<void> {
    const foundTrainer = await this.usersRepository.findTrainerById(id);

    if (!foundTrainer) {
      throw new UserDoesNotExistsException(id, 'id');
    }

    const foundSubscribersIds = await this.usersRepository.findSubscribersIds(id);

    if (!foundSubscribersIds.includes(subscriberId)) {
      throw new NotFoundInSubscribers(subscriberId);
    }

    await this.usersRepository.removeFromSubscribers(id, subscriberId);
  }

  public async getSubscribersIds(trainerId: UUID): Promise<UUID[]> {
    const foundTrainer = await this.usersRepository.findTrainerById(trainerId);

    if (!foundTrainer) {
      throw new UserDoesNotExistsException(trainerId, 'id');
    }

    const subscribersIds = await this.usersRepository.findSubscribersIds(trainerId);

    return subscribersIds;
  }

  public async getUsersEmailsByIds(ids: UUID[]): Promise<string[]>{
    const foundUsersEmails = await this.usersRepository.findUsersEmailsByIds(ids);

    return foundUsersEmails;
  }
}

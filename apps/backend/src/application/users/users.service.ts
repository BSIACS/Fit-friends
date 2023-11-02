import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UUID } from '../../types/uuid.type';
import { VerifyUserDto } from './dto/verify-user-dto';
import { UsersRepository } from './users.repository';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../../types/token-payload.interface';
import { RefreshTokenRepository } from '../refresh-token/refresh-tokens.repository';
import { UserExistsException } from './exceptions/user-exists.exception';
import { comparePassword } from '../../utils/password.util';
import { UserPasswordWrongException } from './exceptions/user-password-wrong.exception';
import { UserDoesNotExistsException } from './exceptions/user-does-not-exists.exception';
import { UpdateTrainerDto } from './dto/update-trainer.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) { }

  public async createUser(dto: CreateUserDto | CreateTrainerDto) {
    const foundUser = await this.usersRepository.findTrainerByEmail(dto.email);

    if (foundUser) {
      throw new UserExistsException(foundUser.email);
    }

    const ctreatedUser = this.usersRepository.createTrainer(dto as CreateTrainerDto);

    return ctreatedUser;
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
        secret: 'r-secret',
        expiresIn: '15d',
      }),
    };

    await this.refreshTokenRepository.removeByUserId(userId)
    await this.refreshTokenRepository.create('', result.refreshToken)

    return result;
  }

  public async verifyUser(dto: VerifyUserDto) {
    let foundUser: any = await this.usersRepository.findTrainerByEmail(dto.email);

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

  public async getUserDetail(id: UUID) {
    let foundUser: any = await this.usersRepository.findUserDetail(id);

    if(!foundUser){
      foundUser = await this.usersRepository.findTrainerDetail(id);
    }

    return foundUser;
  }

  public async updateUser(dto: UpdateTrainerDto) {
    let updatedUser;
    try {
      updatedUser = await this.usersRepository.updateTrainer(dto);
    } catch (error) {
      throw new UserDoesNotExistsException(dto.id, 'id');
    }

    return updatedUser;
  }
}

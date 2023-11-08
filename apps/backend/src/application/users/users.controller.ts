import { Body, Controller, Get, NotImplementedException, Param, Post, Query, Req, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserValidationPipe } from '../pipes/user-validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { LoginUserDto } from './dto/login-user-dto';
import { UsersService } from './users.service';
import { TokenPayload } from '../../types/token-payload.interface';
import { JwtRefreshGuard } from '../guards/jwtRefreshGuard.guard';
import { RequestWithTokenPayload } from '../../types/request-with-token-payload.interface';
import { TokensPairRdo } from './rdo/tokens-pair.rdo';
import { ParseFormDataJsonPipe } from '../pipes/parse-form-data-json.pipe';
import { UUID } from '../../types/uuid.type';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { JwtGuard } from '../guards/jwtGuard.guard';
import { WrongUserRoleException } from '../exceptions/wrong-user-role.exception';
import { UserRoleEnum } from '../../types/user-role.enum';
import { GetUsersListQuery } from './query/get-users-list.query';
import { IsUserRoleGuard } from '../guards/is-user-role.guard';

interface UserDetailParamsInterface {
  id: UUID
}

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @Get('usersList')
  @UseGuards(JwtGuard)
  @UseGuards(IsUserRoleGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  public async usersList(@Query() query: GetUsersListQuery) {
    const foundUsers = await this.usersService.getUsersList(query);

    return foundUsers;
  }

  @Post('register')
  @UsePipes(new UserValidationPipe())
  public async register(@Body() data: CreateUserDto | CreateTrainerDto) {
    const createdUser = this.usersService.createUser(data);

    return createdUser;
  }

  @Post('update')
  public async updateUser(@Body() data: UpdateUserDto | UpdateTrainerDto) {
    const updatedUser = this.usersService.updateUser(data);

    return updatedUser;
  }

  @Post('login')
  public async login(@Body() data: LoginUserDto): Promise<TokensPairRdo> {
    const verifiedUser = await this.usersService.verifyUser({ ...data });

    let tokensPair;

    if (verifiedUser) {
      tokensPair = await this.usersService.generateTokens(verifiedUser.id, verifiedUser.email, verifiedUser.name, verifiedUser.role);
    }

    return tokensPair;
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  public async refresh(@Req() request: RequestWithTokenPayload): Promise<TokensPairRdo> {
    const payload: TokenPayload = request.user;
    const tokensPair = await this.usersService.generateTokens(payload.userId, payload.email, payload.name, payload.role);

    return tokensPair;
  }

  @Post('logout')
  public async logout(): Promise<void> {
    throw new NotImplementedException();
  }

  @Get('detail/:id')
  public async userDetail(@Param() { id }: UserDetailParamsInterface) {
    const foundUser = await this.usersService.getUserDetail(id);

    return foundUser;
  }
}

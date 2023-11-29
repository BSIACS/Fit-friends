import { Body, Controller, Get, Param, Patch, Post, Query, Req, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from './users.service';
import { TokenPayload } from '../../../types/token-payload.interface';
import { JwtRefreshGuard } from '../../../guards/jwtRefreshGuard.guard';
import { RequestWithTokenPayload } from '../../../types/request-with-token-payload.interface';
import { TokensPairRdo } from './rdo/tokens-pair.rdo';
import { UUID } from '../../../types/uuid.type';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { JwtGuard } from '../../../guards/jwtGuard.guard';
import { GetUsersListQuery } from './query/get-users-list.query';
import { IsUserRoleGuard } from '../../../guards/is-user-role.guard';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerUploadUserFileOptions } from './multer.utils';
import { LogoutDto } from './dto/loginout.dto';
import { UserRdo } from './rdo/user.rdo';
import { fromEntityToTrainerRdo, fromEntityToUserRdo } from './mappers/users.mappers';
import { TrainerRdo } from './rdo/trainer.rdo';
import { UserRoleEnum } from '../../../types/user-role.enum';
import { TrainerEntityInterface } from '../../../entities/trainer-entity.interface';
import { UserEntityInterface } from '../../../entities/user-entity.interface';
import { IsUserExistPipe } from '../../../pipes/is-user-exist.pipe';

interface UserDetailParamsInterface {
  id: UUID
}

@ApiTags('users')
@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @Get('usersList')
  @ApiQuery({required: false})
  @UseGuards(JwtGuard)
  @UseGuards(IsUserRoleGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  public async usersList(@Query() query: GetUsersListQuery): Promise<(UserRdo | TrainerRdo)[]> {
    const foundUsers = await this.usersService.getUsersList(query);

    const mappedResult = foundUsers.map((entity) => entity.role === UserRoleEnum.TRAINER ? fromEntityToTrainerRdo(entity as TrainerEntityInterface) : fromEntityToUserRdo(entity as UserEntityInterface));

    return mappedResult;
  }

  @Post('register/user')
  //@UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'userAvatar' },
    { name: 'userBackgroundImage' }
  ], multerUploadUserFileOptions))
  public async createUser(@UploadedFiles() files, @Body() dto: CreateUserDto){//: Promise<UserRdo> {
    // const createdUser = await this.usersService.createUser(
    //   dto,
    //   files.userAvatar[0].filename,
    //   files.userBackgroundImage[0].filename
    // );

    // return fromEntityToUserRdo(createdUser);
    console.log(dto);


    return dto;
  }

  // @Post('register/trainer')
  // @ApiBody({ type: CreateTrainerDto })
  // @UsePipes(new ValidationPipe({ transform: true }))
  // @UsePipes(IsUserExistPipe)
  // @UseInterceptors(FileFieldsInterceptor([
  //   { name: 'userAvatar' },
  //   { name: 'userBackgroundImage' },
  //   { name: 'certificate' }
  // ], multerUploadUserFileOptions))
  // public async createTrainer(@UploadedFiles() files, @Body() dto: CreateTrainerDto) {
  //   const createdUser = await this.usersService.createTrainer(
  //     dto,
  //     files.userAvatar[0].filename,
  //     files.userBackgroundImage[0].filename,
  //     files.certificate[0].filename
  //   );

  //   return fromEntityToTrainerRdo(createdUser);
  // }

  @ApiBody({ type: UpdateUserDto })
  @Patch('update/user')
  @UseGuards(JwtGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  public async updateUser(@Body() data: UpdateUserDto): Promise<UserRdo> {
    const updatedUser = await this.usersService.updateUser(data);

    return fromEntityToUserRdo(updatedUser);
  }

  @ApiBody({ type: UpdateTrainerDto })
  @Patch('update/trainer')
  @UseGuards(JwtGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  public async updateTrainer(@Body() dto: UpdateTrainerDto): Promise<TrainerRdo> {
    console.log(dto);

    const updatedUser = await this.usersService.updateTrainer(dto);

    return fromEntityToTrainerRdo(updatedUser);;
  }


  @Post('login')
  public async login(@Body() dto: LoginUserDto): Promise<TokensPairRdo> {
    const verifiedUser = await this.usersService.verifyUser({ ...dto });

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

  @ApiBody({ type: LogoutDto })
  @Get('logout')
  public async logout(@Body() dto: LogoutDto): Promise<void> {
    await this.usersService.deleteRefreshToken(dto.id);
  }

  @ApiParam({name: 'id', description: 'User UUID'})
  @Get('detail/:id')
  @UseGuards(JwtGuard)
  public async userDetail(@Param() { id }: UserDetailParamsInterface): Promise<UserRdo> {
    const foundUser = await this.usersService.getUserDetail(id);

    return fromEntityToUserRdo(foundUser);
  }
}

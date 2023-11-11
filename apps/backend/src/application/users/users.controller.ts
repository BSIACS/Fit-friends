import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, NotImplementedException, Param, ParseFilePipe, Post, Query, Req, Request, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserValidationPipe } from '../pipes/user-validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { LoginUserDto } from './dto/login-user-dto';
import { UsersService } from './users.service';
import { TokenPayload } from '../../types/token-payload.interface';
import { JwtRefreshGuard } from '../guards/jwtRefreshGuard.guard';
import { RequestWithTokenPayload } from '../../types/request-with-token-payload.interface';
import { TokensPairRdo } from './rdo/tokens-pair.rdo';
import { UUID } from '../../types/uuid.type';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { JwtGuard } from '../guards/jwtGuard.guard';
import { GetUsersListQuery } from './query/get-users-list.query';
import { IsUserRoleGuard } from '../guards/is-user-role.guard';
import { ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import multer, { Multer } from 'multer';
import { multerUploadUserFileOptions } from './multer.utils';

interface UserDetailParamsInterface {
  id: UUID
}

@ApiTags('users')
@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @Post('register/user')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'userAvatar' },
    { name: 'userBackgroundImage' }
  ], multerUploadUserFileOptions))
  public async createUser(@UploadedFiles() files, @Body() dto: CreateUserDto) {
    const createdUser = this.usersService.createUser(dto, files.userAvatar[0].filename, files.userBackgroundImage[0].filename);

    return createdUser;
  }

  @Get('usersList')
  @UseGuards(JwtGuard)
  @UseGuards(IsUserRoleGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  public async usersList(@Query() query: GetUsersListQuery) {
    const foundUsers = await this.usersService.getUsersList(query);


    return foundUsers;
  }

  // @ApiBody({ type: CreateUserDto })
  // @Post('register/user')
  // @UsePipes()
  // public async createUser(@Body() dto: CreateUserDto) {
  //   const createdUser = this.usersService.createUser(dto);

  //   return createdUser;
  // }

  @ApiBody({ type: CreateTrainerDto })
  @Post('register/trainer')
  @UsePipes()
  public async createTrainer(@Body() data: CreateTrainerDto) {
    const createdUser = this.usersService.createTrainer(data);

    return createdUser;
  }

  @ApiBody({ type: UpdateUserDto })
  @Post('update/user')
  @UsePipes()
  @Post('update')
  public async updateUser(@Body() data: UpdateUserDto) {
    const updatedUser = this.usersService.updateUser(data);

    return updatedUser;
  }

  @ApiBody({ type: UpdateTrainerDto })
  @Post('update/trainer')
  @UsePipes()
  @Post('update')
  public async updateTrainer(@Body() data: UpdateTrainerDto) {
    const updatedUser = this.usersService.updateTrainer(data);

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

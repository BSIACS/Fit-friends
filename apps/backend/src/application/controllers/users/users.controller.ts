import { Body, Controller, Get, Param, Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
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
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { multerUploadUserFileOptions } from './multer.utils';
import { LogoutDto } from './dto/loginout.dto';
import { UserRdo } from './rdo/user.rdo';
import { fromEntityToTrainerRdo, fromEntityToUserRdo } from './mappers/users.mappers';
import { TrainerRdo } from './rdo/trainer.rdo';
import { UserRoleEnum } from '../../../types/user-role.enum';
import { TrainerEntityInterface } from '../../../entities/trainer-entity.interface';
import { UserEntityInterface } from '../../../entities/user-entity.interface';
import { IsUserExistPipe } from '../../../pipes/is-user-exist.pipe';
import { CreateTrainerRdo } from './rdo/create-trainer.rdo';
import { UploadFileManagerService } from '../../upload-file-manager/upload-file-manager.service';
import { TrainerQuestionnaireDto } from './dto/trainer-questionnaire.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserRdo } from './rdo/create-user.rdo';
import { UserQuestionnaireDto } from './dto/user-questionnaire.dto';

interface UserDetailParamsInterface {
  id: UUID
}

@ApiTags('users')
@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
    private readonly uploadFileManagerService: UploadFileManagerService
  ) { }

  @Get('usersList')
  @ApiQuery({ required: false })
  @UseGuards(JwtGuard)
  @UseGuards(IsUserRoleGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  public async usersList(@Query() query: GetUsersListQuery): Promise<(UserRdo | TrainerRdo)[]> {
    const foundUsers = await this.usersService.getUsersList(query);

    const mappedResult = foundUsers.map((entity) => entity.role === UserRoleEnum.TRAINER ? fromEntityToTrainerRdo(entity as TrainerEntityInterface) : fromEntityToUserRdo(entity as UserEntityInterface));

    return mappedResult;
  }

  @Post('register/user')
  @ApiBody({ type: CreateUserDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @UsePipes(IsUserExistPipe)
  @UseInterceptors(FileInterceptor('userAvatar'))
  public async createUser(@UploadedFile() file, @Body() dto: CreateUserDto): Promise<CreateUserRdo> {
    const createdUser = await this.usersService.createUser(dto, 'avatar');

    this.uploadFileManagerService.saveAvatar(createdUser.id, file);

    const tokensPair = await this.usersService.generateTokens(createdUser.id, createdUser.email, createdUser.name, createdUser.role);

    return {user: fromEntityToUserRdo(createdUser), tokensPair: tokensPair };
  }

  @Post('register/trainer')
  @ApiBody({ type: CreateTrainerDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @UsePipes(IsUserExistPipe)
  @UseInterceptors(FileInterceptor('userAvatar'))
  public async createTrainer(@UploadedFile() file, @Body() dto: CreateTrainerDto): Promise<CreateTrainerRdo> {
    const createdUser = await this.usersService.createTrainer(dto, 'avatar');

    this.uploadFileManagerService.saveAvatar(createdUser.id, file);

    const tokensPair = await this.usersService.generateTokens(createdUser.id, createdUser.email, createdUser.name, createdUser.role);

    return { trainer: fromEntityToTrainerRdo(createdUser), tokensPair: tokensPair };
  }

  @Patch('questionnaire/trainer')
  @UsePipes(new ValidationPipe({ transform: true }))
  //@UsePipes(IsUserExistPipe)  //Проверить на наличие в БД
  @UseInterceptors(FileInterceptor('certificate'))
  public async questionnaireTrainer(@UploadedFile() file, @Body() dto: TrainerQuestionnaireDto) {
    const certificateFileName: string = uuidv4();
    file.originalname = certificateFileName;

    const updatedUser = await this.usersService.updateTrainer({ ...dto }, certificateFileName);

    this.uploadFileManagerService.saveCertificate(updatedUser.id, file);

    return fromEntityToTrainerRdo(updatedUser);
  }

  @Patch('questionnaire/user')
  @UsePipes(new ValidationPipe({ transform: true }))
  //@UsePipes(IsUserExistPipe)  //Проверить на наличие в БД
  @UseInterceptors(FileInterceptor(''))
  public async questionnaireUser(@Body() dto: UserQuestionnaireDto) {
    console.log(dto);

    const updatedUser = await this.usersService.updateUser({ ...dto });

    return fromEntityToUserRdo(updatedUser);
  }

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
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'userAvatar' },
  ], multerUploadUserFileOptions))
  public async updateTrainer(@Body() dto: UpdateTrainerDto) {
    const updatedUser = await this.usersService.updateTrainer(dto);

    return fromEntityToTrainerRdo(updatedUser);;
  }


  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
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

  @ApiParam({ name: 'id', description: 'User UUID' })
  @Get('detail/:id')
  @UseGuards(JwtGuard)
  public async userDetail(@Param() { id }: UserDetailParamsInterface): Promise<UserRdo> {
    const foundUser = await this.usersService.getUserDetail(id);

    return fromEntityToUserRdo(foundUser);
  }

  @ApiParam({ name: 'id', description: 'User UUID' })
  @Get('detail/trainer/:id')
  @UseGuards(JwtGuard)
  public async trainerDetail(@Param() { id }: UserDetailParamsInterface): Promise<TrainerRdo> {
    const foundTrainer = await this.usersService.getTrainerDetail(id);

    return fromEntityToTrainerRdo(foundTrainer);
  }
}

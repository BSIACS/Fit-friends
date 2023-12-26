import { Body, Controller, Get, Param, Patch, Post, Query, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { TrainerAccountService } from './trainer-account.service';
import { UUID } from '../../../types/uuid.type';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { GetTrainingsListQuery } from './query/get-trainings-list.query';
import { UsersService } from '../users/users.service';
import { JwtGuard } from '../../../guards/jwtGuard.guard';
import { IsTrainerRoleGuard } from '../../../guards/is-trainer-role.guard';
import { MailService } from '../../mail/mail.service';
import { SendNewTrainingNotificationsDto } from './dto/send-new-training-notifications.dto';
import { TrainingsService } from '../trainings/trainings.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { multerUploadTrainingFileOptions } from '../../../config/multer-upload-training-file.options';
import { TrainingRdo } from './rdo/training.rdo';
import { fromEntitiesToTrainingsRdos, fromEntityToTrainingRdo } from './mappers/training.mapper';
import { RequestWithTokenPayload } from '../../../types/request-with-token-payload.interface';
import { TokenPayload } from '../../../types/token-payload.interface';
import { GetFriendsListQuery } from './query/get-friends-list.query';
import { GetFriendsListRdo } from './rdo/get-friends-list.rdo';
import { fromEntitiesToUsersAndTrainersRdos } from '../users/mappers/users.mappers';
import { UploadFileManagerService } from '../../upload-file-manager/upload-file-manager.service';
import { GetOrdersQuery } from './query/get-orders-list.query';


interface GetTrainingByIdParamsInterface {
  id: UUID;
}

@ApiTags('trainerAccount')
@Controller('trainerAccount')
@UseGuards(JwtGuard)
export class TrainerAccountController {

  constructor(
    private trainerAccountService: TrainerAccountService,
    private userService: UsersService,
    private mailService: MailService,
    private trainingsService: TrainingsService,
    private readonly uploadFileManagerService: UploadFileManagerService
  ) { }

  @Post('createTraining')
  @ApiBody({ type: CreateTrainingDto })
  @UseGuards(IsTrainerRoleGuard)
  @UsePipes(new ValidationPipe({transform: true}))
  @UseInterceptors(FileInterceptor('videoDemo'))
  public async createTraining(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateTrainingDto) {//: Promise<TrainingRdo> {
    const createdTraining = await this.trainerAccountService.createTraining(dto, file.originalname);

    if (file) {
      this.uploadFileManagerService.saveTrainingVideoDemo(createdTraining.id, file);
    }

    await this.trainerAccountService.createNewTrainingScheduledNotification(createdTraining.trainingCreatorId, createdTraining.id);

    return fromEntityToTrainingRdo(createdTraining);
  }

  @UseGuards(IsTrainerRoleGuard)
  @Post('sendNewTrainingNotifications')
  public async sendNewTrainingNotifications(@Body() dto: SendNewTrainingNotificationsDto) {
    const foundTrainer = await this.userService.getUserDetail(dto.trainingCreatorId);

    const subscribersIds = await this.trainerAccountService.getSubscribersIdsForNotifications(dto.trainingCreatorId, dto.trainingId);

    const subscribersEmails = await this.userService.getUsersEmailsByIds(subscribersIds);

    const foundTraining = await this.trainingsService.findTrainingById(dto.trainingId);

    await this.mailService.sendNewTrainingNotification(foundTrainer.name, foundTraining.name, subscribersEmails);

    await this.trainerAccountService.removeNewTrainingScheduledNotification(dto.trainingCreatorId, dto.trainingId)

    return;
  }

  @ApiBody({ type: UpdateTrainingDto })
  @UseGuards(IsTrainerRoleGuard)
  @Patch('updateTraining')
  public async updateTraining(@Body() dto: UpdateTrainingDto) {
    const updatedTraining = await this.trainerAccountService.updateTraining(dto);

    return updatedTraining;
  }

  @UseGuards(IsTrainerRoleGuard)
  @Patch('updateTrainingVideo')
  @UseInterceptors(FileInterceptor('trainingVideo'))
  public async updateTrainingVideo(@UploadedFile() file) {
    console.log(file);
  }

  @ApiParam({ name: 'id', description: 'Training UUID' })
  @UseGuards(IsTrainerRoleGuard)
  @Get('training/:id')
  public async getTrainingById(@Param() { id }: GetTrainingByIdParamsInterface) {
    const foundTraining = await this.trainerAccountService.findTrainingById(id);

    return { result: foundTraining };
  }

  @UseGuards(IsTrainerRoleGuard)
  @Get('getTrainingsList')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async getTrainingsList(@Req() request: RequestWithTokenPayload, @Query() query: GetTrainingsListQuery) {
    const payload: TokenPayload = request.user;
    const foundTrainingsWithCount = await this.trainerAccountService.getTrainingsList(payload.userId, query);

    return {trainings: fromEntitiesToTrainingsRdos(foundTrainingsWithCount.trainingList), count: foundTrainingsWithCount.count};
  }

  @UseGuards(IsTrainerRoleGuard)
  @Get('getOrders')
  public async getOrders(@Req() request: RequestWithTokenPayload, @Query() query: GetOrdersQuery) {
    const payload: TokenPayload = request.user;
    const foundOrders = await this.trainerAccountService.getOdersByTrainerId(payload.userId, query);

    return {orders: foundOrders.ordersRdo, count: foundOrders.ordersCount};
  }

  @Get('friends/:id')
  public async getFriendList(@Req() request: RequestWithTokenPayload, @Query() query: GetFriendsListQuery): Promise<GetFriendsListRdo> {
    const payload: TokenPayload = request.user;
    const foundFriends = await this.trainerAccountService.getFriendList(payload.userId, query.friendsPerPage, query.pageNumber);
    const friendsNumber = await this.trainerAccountService.getFriendsNumber(payload.userId);

    return {
      friends: fromEntitiesToUsersAndTrainersRdos(foundFriends),
      friendsNumber: friendsNumber,
    }
  }
}

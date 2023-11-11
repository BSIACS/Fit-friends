import { Body, Controller, Get, Param, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TrainerAccountService } from './trainer-account.service';
import { UUID } from '../../types/uuid.type';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { GetTrainingListDto } from './dto/get-training-list.dto';
import { GetPurchasesDto } from './dto/get-purchases.dto';
import { GetTrainingsListQuery } from './query/get-trainings-list.query';
import { UsersService } from '../users/users.service';
import { JwtGuard } from '../guards/jwtGuard.guard';
import { IsTrainerRoleGuard } from '../guards/is-trainer-role.guard';
import { MailService } from '../mail/mail.service';
import { SendNewTrainingNotificationsDto } from './dto/send-new-training-notifications.dto';
import { TrainingsService } from '../trainings/trainings.service';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';


interface GetTrainingByIdParamsInterface {
  id: UUID;
}
//@UseGuards(JwtGuard)
@ApiTags('trainerAccount')
@Controller('trainerAccount')
export class TrainerAccountController {

  constructor(
    private trainerAccountService: TrainerAccountService,
    private userService: UsersService,
    private mailService: MailService,
    private trainingsService: TrainingsService

  ) { }

  @Post('createTraining')
  @ApiBody({type: CreateTrainingDto})
  @UseGuards(JwtGuard)
  @UseGuards(IsTrainerRoleGuard)
  public async createTraining(@Body() dto: CreateTrainingDto) {
    const createdTraining = await this.trainerAccountService.createTraining(dto);

    await this.trainerAccountService.createNewTrainingScheduledNotification(createdTraining.trainingCreatorId, createdTraining.id);

    return createdTraining;
  }

  @UseGuards(JwtGuard)
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

  @ApiBody({type: UpdateTrainingDto})
  @ApiHeader({
    name: 'Authorization:'
  })
  @UseGuards(JwtGuard)
  @UseGuards(IsTrainerRoleGuard)
  @Post('updateTraining')
  public async updateTraining(@Body() dto: UpdateTrainingDto) {
    const updatedTraining = this.trainerAccountService.updateTraining(dto);

    return updatedTraining;
  }

  @UseGuards(JwtGuard)
  @Get('training/:id')
  public async getTrainingById(@Param() { id }: GetTrainingByIdParamsInterface) {
    const foundTraining = await this.trainerAccountService.findTrainingById(id);

    return { result: foundTraining };
  }

  @UseGuards(JwtGuard)
  @UseGuards(IsTrainerRoleGuard)
  @Post('getTrainingList')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async getTrainingList(@Body() dto: GetTrainingListDto, @Query() query: GetTrainingsListQuery) {
    const foundTrainings = await this.trainerAccountService.getTrainingList(dto.trainerId, query);

    return foundTrainings;
  }
  @UseGuards(JwtGuard)
  @UseGuards(IsTrainerRoleGuard)
  @Post('getPurchases')
  public async getPurchases(@Body() dto: GetPurchasesDto) {
    const foundTrainingIds = await this.trainerAccountService.getPurchasesByTrainerId(dto.trainerId);

    return foundTrainingIds;
  }
}

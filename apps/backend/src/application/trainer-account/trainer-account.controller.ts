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


interface GetTrainingByIdParamsInterface {
  id: UUID;
}

@Controller('trainerAccount')
export class TrainerAccountController {

  constructor(private trainerAccountService: TrainerAccountService, private userService: UsersService){} ///!!!!Добавлен, проверить

  @UseGuards(JwtGuard)
  @UseGuards(IsTrainerRoleGuard)
  @Post('createTraining')
  public async createTraining(@Body() dto: CreateTrainingDto) {
    const createdTraining = this.trainerAccountService.createTraining(dto);

    return createdTraining;
  }

  @UseGuards(JwtGuard)
  @UseGuards(IsTrainerRoleGuard)
  @Post('updateTraining')
  public async updateTraining(@Body() dto: UpdateTrainingDto) {
    const updatedTraining = this.trainerAccountService.updateTraining(dto);

    return updatedTraining;
  }

  @UseGuards(JwtGuard)
  @Get('training/:id')
  public async getTrainingById(@Param() {id}: GetTrainingByIdParamsInterface){
    const foundTraining = await this.trainerAccountService.findTrainingById(id);

    return { result: foundTraining};
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

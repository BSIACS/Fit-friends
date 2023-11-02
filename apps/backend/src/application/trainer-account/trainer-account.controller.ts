import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TrainerAccountService } from './trainer-account.service';
import { UUID } from '../../types/uuid.type';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { GetTrainingListDto } from './dto/get-training-list.dto';
import { GetPurchasesDto } from './dto/get-purchases.dto';


interface GetTrainingByIdParamsInterface {
  id: UUID;
}

@Controller('trainerAccount')
export class TrainerAccountController {

  constructor(private trainerAccountService: TrainerAccountService){}

  @Post('createTraining')
  public async createTraining(@Body() dto: CreateTrainingDto) {

    const createdTraining = this.trainerAccountService.createTraining(dto)

    return createdTraining;
  }

  @Post('updateTraining')
  public async updateTraining(@Body() dto: UpdateTrainingDto) {
    const updatedTraining = this.trainerAccountService.updateTraining(dto)

    return updatedTraining;
  }

  @Get('training/:id')
  public async getTrainingById(@Param() {id}: GetTrainingByIdParamsInterface){
    const foundTraining = await this.trainerAccountService.findTrainingById(id);

    return { result: foundTraining};
  }

  @Post('getTrainingList')
  public async getTrainingList(@Body() dto: GetTrainingListDto) {
    const foundTrainings = await this.trainerAccountService.getTrainingList(dto.trainerId);

    return foundTrainings;
  }

  @Post('getPurchases')
  public async getPurchases(@Body() dto: GetPurchasesDto) {
    const foundTrainingIds = await this.trainerAccountService.getPurchasesByTrainerId(dto.trainerId);

    return foundTrainingIds;
  }
}

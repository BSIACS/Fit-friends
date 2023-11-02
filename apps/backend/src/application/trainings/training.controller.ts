import { Body, Controller, Post } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';


@Controller('trainings')
export class TrainingsController {


  @Post('create')
  public async createTraining(@Body() data: CreateTrainingDto) {

    return data;
  }

  @Post('update')
  public async updateTraining(@Body() data: CreateTrainingDto) {

    return data;
  }

  @Post('detail')
  public async trainingDetail(@Body() data: CreateTrainingDto) {

    return data;
  }

  @Post('trainingList')
  public async trainingList(@Body() data: CreateTrainingDto) {

    return data;
  }

  @Post('purchases')
  public async purchases(@Body() data: CreateTrainingDto) {

    return data;
  }
}

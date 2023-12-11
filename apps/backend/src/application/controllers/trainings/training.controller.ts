import { Body, Controller, Get, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TrainingsService } from './trainings.service';
import { GetTrainingsCatalogueQuery } from './query/get-trainings-catalogue.query';
import { JwtGuard } from '../../../guards/jwtGuard.guard';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { fromEntitiesToTrainingsRdos, fromEntityToTrainingRdo } from '../trainer-account/mappers/training.mapper';
import { TrainingDetailDto } from './dto/training-detail.dto';


@ApiTags('trainings')
@UseGuards(JwtGuard)
@Controller('trainings')
export class TrainingsController {

  constructor(
    private readonly trainingsService: TrainingsService
  ){}

  @ApiHeader({
    name: 'Authorization:'
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('/catalogue')
  public async trainingsCatalogue(@Body() data: any, @Query() query: GetTrainingsCatalogueQuery) {
    const foundTrainings = await this.trainingsService.findTrainings(query);

    return fromEntitiesToTrainingsRdos(foundTrainings);
  }

  @ApiHeader({
    name: 'Authorization:'
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('/detail')
  public async trainingDetail(@Body() dto: TrainingDetailDto) {
    const foundTraining = await this.trainingsService.findTrainingById(dto.id);

    return foundTraining;
  }

}

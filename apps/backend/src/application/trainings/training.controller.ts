import { Body, Controller, Get, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TrainingsService } from './trainings.service';
import { GetTrainingsCatalogueQuery } from './query/get-trainings-catalogue.query';
import { JwtGuard } from '../guards/jwtGuard.guard';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('trainings')
@UseGuards(JwtGuard)
@Controller('trainings')
export class TrainingsController {

  constructor(
    private readonly trainingsService: TrainingsService
  ){}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('/catalogue')
  public async trainingsCatalogue(@Body() data: any, @Query() query: GetTrainingsCatalogueQuery) {
    const foundTrainings = await this.trainingsService.findTrainings(query);

    return foundTrainings;
  }

}

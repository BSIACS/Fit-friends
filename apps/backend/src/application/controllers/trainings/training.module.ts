import { Module } from '@nestjs/common';
import { TrainingsRepository } from '../../prisma/trainings.repository';
import { TrainingsController } from './training.controller';
import { TrainingsService } from './trainings.service';

@Module({
  imports: [],
  controllers: [TrainingsController],
  providers: [ TrainingsRepository, TrainingsService ],
  exports: [ TrainingsRepository ]
})
export class TrainingsModule { }

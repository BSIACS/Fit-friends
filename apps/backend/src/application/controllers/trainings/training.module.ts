import { Module } from '@nestjs/common';
import { TrainingsRepository } from './trainings.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { TrainingsController } from './training.controller';
import { TrainingsService } from './trainings.service';

@Module({
  imports: [],
  controllers: [TrainingsController],
  providers: [ PrismaService, TrainingsRepository, TrainingsService ],
  exports: [ TrainingsRepository ]
})
export class TrainingsModule { }

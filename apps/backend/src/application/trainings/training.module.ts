import { Module } from '@nestjs/common';
import { TrainingsRepository } from './trainings.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ PrismaService, TrainingsRepository ],
  exports: [ TrainingsRepository ]
})
export class TrainingModule { }

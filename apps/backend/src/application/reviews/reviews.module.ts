import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewsService } from './reviews.service';
import { ReviewsRepository } from './reviews.repository';
import { ReviewsController } from './reviews.controller';
import { TrainingsRepository } from '../trainings/trainings.repository';



@Module({
  imports: [],
  controllers: [ReviewsController],
  providers: [PrismaService, ReviewsRepository, ReviewsService, TrainingsRepository],
  exports: []
})
export class ReviewsModule { }

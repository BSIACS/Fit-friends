import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsRepository } from '../../prisma/reviews.repository';
import { ReviewsController } from './reviews.controller';
import { TrainingsRepository } from '../../prisma/trainings.repository';



@Module({
  imports: [],
  controllers: [ReviewsController],
  providers: [ReviewsRepository, ReviewsService, TrainingsRepository],
  exports: []
})
export class ReviewsModule { }

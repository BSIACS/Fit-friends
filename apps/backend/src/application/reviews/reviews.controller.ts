import { Body, Controller, Get, Param, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UUID } from '../../types/uuid.type';

interface GetReviewsParamsInterface{
  id: UUID
}

@Controller('reviews')
export class ReviewsController {

  constructor(
    private readonly reviewsService: ReviewsService
  ){}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('/:id')
  public async getReviews(@Param() { id }: GetReviewsParamsInterface) {
    const foundReviews = await this.reviewsService.findReviewByTrainingId(id);

    return foundReviews;
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('/')
  public async createReview(@Body() dto: CreateReviewDto) {
    const createdReview = await this.reviewsService.createReview(dto.userId, dto.trainingId, dto.rating, dto.text)

    return createdReview;
  }

}

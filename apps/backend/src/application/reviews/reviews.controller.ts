import { Body, Controller, Get, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UUID } from '../../types/uuid.type';
import { ApiTags } from '@nestjs/swagger';
import { RequestWithTokenPayload } from '../../types/request-with-token-payload.interface';
import { TokenPayload } from '../../types/token-payload.interface';
import { JwtGuard } from '../guards/jwtGuard.guard';

interface GetReviewsParamsInterface{
  id: UUID
}

@ApiTags('reviews')
@Controller('reviews')
@UseGuards(JwtGuard)
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
  public async createReview(@Req() request: RequestWithTokenPayload, @Body() dto: CreateReviewDto) {
    const payload: TokenPayload = request.user;
    const createdReview = await this.reviewsService.createReview(payload.userId, dto.trainingId, dto.rating, dto.text)

    return createdReview;
  }

}

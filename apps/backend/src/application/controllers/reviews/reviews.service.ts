import { Injectable } from '@nestjs/common';
import { ReviewsRepository } from '../../prisma/reviews.repository';
import { UUID } from '../../../types/uuid.type';
import { TrainingDoesNotExistsException } from '../../../exceptions/training-does-not-exists.exception';
import { TrainingsRepository } from '../../prisma/trainings.repository';


@Injectable()
export class ReviewsService {

  constructor(
    private readonly reviewsRepository: ReviewsRepository,
    private readonly trainingsRepository: TrainingsRepository
  ) { }

  public async findReviewByTrainingId(id: UUID) {
    const foundTraining = await this.trainingsRepository.findTrainingById(id);

    if (!foundTraining) {
      throw new TrainingDoesNotExistsException(id, 'id');
    }

    const foundReviews = await this.reviewsRepository.findReviewsByTrainingId(id);

    return foundReviews;
  }

  public async createReview(userId: UUID, trainingId: UUID, rating: number, text: string) {
    const foundTrainings = await this.trainingsRepository.findTrainingById(trainingId);

    if (!foundTrainings) {
      throw new TrainingDoesNotExistsException(trainingId, 'id');
    }

    const createdReview = await this.reviewsRepository.createReview(userId, trainingId, rating, text);

    await this.trainingsRepository.updateTrainingsRating(trainingId, rating)

    return createdReview;
  }
}

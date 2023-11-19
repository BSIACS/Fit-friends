import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UUID } from '../../../types/uuid.type';



@Injectable()
export class ReviewsRepository {

  constructor(private readonly prisma: PrismaService) { }

  public async findReviewsByTrainingId(id: UUID) {
    const createdTraining = await this.prisma.review.findMany({
      where: {
        trainingId: id
      }
    });

    return createdTraining;
  }

  public async createReview(userId: UUID, trainingId: UUID, rating: number, text: string) {
    const createdTraining = await this.prisma.review.create({
      data: {
        userId: userId,
        trainingId: trainingId,
        rating: rating,
        text: text,
        createdAt: new Date()
      }
    });

    return createdTraining;
  }
}

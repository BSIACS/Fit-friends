import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UUID } from '../../types/uuid.type';



@Injectable()
export class ReviewsRepository {

  constructor(private readonly prisma: PrismaService) { }

  public async findReviewsByTrainingId(id: UUID) {
    const createdTraining = await this.prisma.review.findMany({
      where: {
        trainingId: id
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatarFileName: true,
          }
        }
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
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatarFileName: true,
          }
        }
      }
    });

    return createdTraining;
  }
}

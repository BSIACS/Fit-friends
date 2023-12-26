import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { TrainingEntityInterface } from '../controllers/trainings/training-entity.interface';
import { UUID } from '../../types/uuid.type';
import { GetTrainingsListQuery } from '../controllers/trainer-account/query/get-trainings-list.query';
import { GetTrainingsCatalogueQuery } from '../controllers/trainings/query/get-trainings-catalogue.query';
import { CreateTrainingDto } from '../controllers/trainer-account/dto/create-training.dto';
import { UpdateTrainingDto } from '../controllers/trainer-account/dto/update-training.dto';
import { TrainingWithUserDataEntityInterface } from '../controllers/trainings/entities/training-with-user-data-entity.interface';



@Injectable()
export class TrainingsRepository {

  constructor(private readonly prisma: PrismaService) { }

  public async createTraining(dto: CreateTrainingDto, videoDemoFileName: string): Promise<TrainingEntityInterface> {
    const createdTraining: TrainingEntityInterface = await this.prisma.training.create({
      data: {
        name: dto.name,
        backgroundImgFileName: 'defaultTrainingImage',
        trainingLevel: dto.trainingLevel,
        trainingType: dto.trainingType,
        trainingDuration: dto.trainingDuration,
        price: Number(dto.price),
        calories: Number(dto.calories),
        description: dto.description,
        sex: dto.sex,
        videoDemoFileName: videoDemoFileName,
        rating: 0,
        votesNumber: 0,
        pointsSum: 0,
        trainingCreatorId: dto.trainingCreatorId,
        isSpecial: false,
      }
    });

    return createdTraining;
  }

  public async updateTraining(dto: UpdateTrainingDto): Promise<TrainingEntityInterface | null> {
    const updatedTraining: TrainingEntityInterface | null = await this.prisma.training.update({
      where: {
        id: dto.id
      },
      data: dto,
      include: {
        trainer: {
          select: {
            id: true,
            name: true,
            avatarFileName: true,
          }
        }
      }
    });

    return updatedTraining;
  }

  public async updateTrainingsRating(id: UUID, rate: number): Promise<void> {
    const foundTraining = await this.prisma.training.findFirst({
      where: {
        id: id
      }
    });

    await this.prisma.training.update({
      where: {
        id: id
      },
      data: {
        votesNumber: ++foundTraining.votesNumber,
        rating: foundTraining.rating + rate
      }
    });

    return;
  }

  public async findTrainingById(id: UUID): Promise<TrainingWithUserDataEntityInterface> {
    const foundTraining = await this.prisma.training.findFirst({
      where: {
        id: id
      },
      include: {
        trainer: {
          select: {
            id: true,
            name: true,
            avatarFileName: true,
          }
        }
      }
    });

    return foundTraining;
  }

  public async findTrainingsByCreatorId(id: UUID, query: GetTrainingsListQuery = undefined): Promise<TrainingEntityInterface[]> {
    let trainingDuration = undefined;
    if (query !== undefined && query.trainingDuration !== undefined) {
      trainingDuration = query.trainingDuration.split(',')
    }

    const foundTrainings = await this.prisma.training.findMany({
      take: query ? query.trainingsPerPage * query.pageNumber : undefined,
      where: {
        trainingCreatorId: id,
        calories: query?.minCalories !== undefined && query?.maxCalories !== undefined ? {
          lte: +query?.maxCalories,
          gte: +query?.minCalories
        } : {},
        price: query?.minPrice !== undefined && query?.maxPrice !== undefined ? {
          lte: +query?.maxPrice,
          gte: +query?.minPrice
        } : {},
        rating: query?.minRate !== undefined && query?.maxRate !== undefined ? {
          lte: +query?.maxRate,
          gte: +query?.minRate
        } : {},
        trainingDuration: {
          in: trainingDuration ? trainingDuration : undefined
        }
      },
    });

    return foundTrainings;
  }

  public async getTrainingsCountByCreatorId(id: UUID, query: GetTrainingsListQuery = undefined): Promise<number> {
    let trainingDuration = undefined;
    if (query.trainingDuration !== undefined) {
      trainingDuration = query.trainingDuration.split(',')
    }

    const count = await this.prisma.training.count({
      where: {
        trainingCreatorId: id,
        calories: query.minCalories !== undefined && query.maxCalories !== undefined ? {
          lte: +query.maxCalories,
          gte: +query.minCalories
        } : {},
        price: query.minPrice !== undefined && query.maxPrice !== undefined ? {
          lte: +query.maxPrice,
          gte: +query.minPrice
        } : {},
        rating: query.minRate !== undefined && query.maxRate !== undefined ? {
          lte: +query.maxRate,
          gte: +query.minRate
        } : {},
        trainingDuration: {
          in: trainingDuration ? trainingDuration : undefined
        }
      },
    });

    return count;
  }

  public async findTrainingIdsByCreatorId(id: UUID): Promise<string[]> {
    const foundIds = await this.prisma.training.findMany({
      where: {
        trainingCreatorId: id
      },
      select: {
        id: true
      }
    });

    return foundIds.map((id) => id.id);
  }

  public async findTrainings(query: GetTrainingsCatalogueQuery): Promise<TrainingEntityInterface[] | null> {
    let trainingTypes = undefined;

    if (query.trainingType !== undefined) {
      trainingTypes = query.trainingType.split(',')
    }

    if(!query || !query.trainingsPerPage || !query.pageNumber){
      query.trainingsPerPage = 50;
      query.pageNumber = 1;
    }

    const foundTrainings = await this.prisma.training.findMany({
      take: query ? query.trainingsPerPage * query.pageNumber : undefined,
      where: {
        calories: query?.minCalories !== undefined && query?.maxCalories !== undefined ? {
          lte: +query?.maxCalories,
          gte: +query?.minCalories
        } : {},
        price: query?.minPrice !== undefined && query?.maxPrice !== undefined ? {
          lte: +query?.maxPrice,
          gte: +query?.minPrice
        } : {},
        rating: query?.minRate !== undefined && query?.maxRate !== undefined ? {
          lte: +query?.maxRate,
          gte: +query?.minRate
        } : {},
        trainingType: {
          in: trainingTypes ? trainingTypes : undefined
        }
      },
      orderBy: {
        price: query.sortDirection
      }
    });

    return foundTrainings;
  }

  public async getTrainingsCount(query: GetTrainingsCatalogueQuery): Promise<number> {
    let trainingTypes = undefined;

    if (query.trainingType !== undefined) {
      trainingTypes = query.trainingType.split(',')
    }

    const foundTrainingsCount = await this.prisma.training.count({
      where: {
        calories: query?.minCalories !== undefined && query?.maxCalories !== undefined ? {
          lte: +query?.maxCalories,
          gte: +query?.minCalories
        } : {},
        price: query?.minPrice !== undefined && query?.maxPrice !== undefined ? {
          lte: +query?.maxPrice,
          gte: +query?.minPrice
        } : {},
        rating: query?.minRate !== undefined && query?.maxRate !== undefined ? {
          lte: +query?.maxRate,
          gte: +query?.minRate
        } : {},
        trainingType: {
          in: trainingTypes ? trainingTypes : undefined
        }
      },
      orderBy: {
        price: query.sortDirection
      }
    });

    return foundTrainingsCount;
  }
}

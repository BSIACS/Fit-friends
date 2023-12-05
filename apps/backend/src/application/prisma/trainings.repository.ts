import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { TrainingEntityInterface } from '../controllers/trainings/training-entity.interface';
import { UUID } from '../../types/uuid.type';
import { GetTrainingsListQuery } from '../controllers/trainer-account/query/get-trainings-list.query';
import { GetTrainingsCatalogueQuery } from '../controllers/trainings/query/get-trainings-catalogue.query';
import { CreateTrainingDto } from '../controllers/trainer-account/dto/create-training.dto';
import { UpdateTrainingDto } from '../controllers/trainer-account/dto/update-training.dto';



@Injectable()
export class TrainingsRepository {

  constructor(private readonly prisma: PrismaService) { }

  public async createTraining(dto: CreateTrainingDto, videoDemoFileName: string): Promise<TrainingEntityInterface> {
    console.log(videoDemoFileName);

    console.log(dto);


    const createdTraining: TrainingEntityInterface = await this.prisma.training.create({
      data: {
        name: dto.name,
        backgroundImgFileName: dto.backgroundImgFileName,
        trainingLevel: dto.trainingLevel,
        trainingType: dto.trainingType,
        trainingDuration: dto.trainingDuration,
        price: dto.price,
        calories: dto.calories,
        description: dto.description,
        sex: dto.sex,
        videoDemoFileName: videoDemoFileName,
        rating: 0,
        votesNumber: 0,
        trainingCreatorId: dto.trainingCreatorId,
        isSpecial: dto.isSpecial,
      }
    });

    return createdTraining;
  }

  public async updateTraining(dto: UpdateTrainingDto): Promise<TrainingEntityInterface | null> {
    const updatedTraining: TrainingEntityInterface | null = await this.prisma.training.update({
      where: {
        id: dto.id
      },
      data: dto
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

  public async findTrainingById(id: UUID): Promise<TrainingEntityInterface | null> {
    const foundTraining = await this.prisma.training.findFirst({
      where: {
        id: id
      }
    });

    return foundTraining;
  }

  public async findTrainingsByCreatorId(id: UUID, filter: GetTrainingsListQuery): Promise<TrainingEntityInterface[] | null> {
    const foundTrainings = await this.prisma.training.findMany({
      where: {
        trainingCreatorId: id,
        calories: filter.caloriesRange ? {
          lte: filter.caloriesRange[1],
          gte: filter.caloriesRange[0]
        } : {},
        price: filter.priceRange ? {
          lte: filter.priceRange[1],
          gte: filter.priceRange[0]
        } : {},
        rating: filter.rate,
        trainingDuration: filter.duration,
      }
    });

    return foundTrainings;
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
    if(query.trainingType !== undefined){
      trainingTypes = query.trainingType.split(',')
    }

    const foundTrainings = await this.prisma.training.findMany({
      where: {
        calories: query.minCalories && query.minCalories ? {
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
}

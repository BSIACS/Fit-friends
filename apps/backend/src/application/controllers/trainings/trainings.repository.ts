import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TrainingEntityInterface } from './training-entity.interface';
import { UUID } from '../../../types/uuid.type';
import { GetTrainingsListQuery } from '../trainer-account/query/get-trainings-list.query';
import { GetTrainingsCatalogueQuery } from './query/get-trainings-catalogue.query';
import { CreateTrainingDto } from '../trainer-account/dto/create-training.dto';
import { UpdateTrainingDto } from '../trainer-account/dto/update-training.dto';



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
    const foundTrainings = await this.prisma.training.findMany({
      where: {
        calories: query.caloriesRange ? {
          lte: +query.caloriesRange[1],
          gte: +query.caloriesRange[0]
        } : {},
        price: query.priceRange ? {
          lte: +query.priceRange[1],
          gte: +query.priceRange[0]
        } : {},
        rating: query.rate ? +query.rate : undefined,
        trainingType: query.trainingType ? query.trainingType : undefined
      },
      orderBy: {
        price: query.sortDirection
      }
    });

    return foundTrainings;
  }
}

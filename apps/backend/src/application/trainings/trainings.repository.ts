import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { TrainingEntityInterface } from './training-entity.interface';
import { UUID } from '../../types/uuid.type';
import { UpdateTrainingDto } from './dto/update-training.dto';



@Injectable()
export class TrainingsRepository {

  constructor(private readonly prisma: PrismaService) { }

  public async createTraining(dto: CreateTrainingDto): Promise<TrainingEntityInterface | null> {

    const createdTraining: TrainingEntityInterface | null = await this.prisma.training.create({
      data: {
        name: dto.name,
        backgroundImgSrc: dto.backgroundImgSrc,
        trainingLevel: dto.trainingLevel,
        trainingType: dto.trainingType,
        trainingDuration: dto.trainingDuration,
        price: dto.price,
        calories: dto.calories,
        description: dto.description,
        sex: dto.sex,
        videoDemoSrc: dto.videoDemoSrc,
        rating: dto.rating,
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

  public async findTrainingById(id: UUID): Promise<TrainingEntityInterface | null> {
    const foundTraining = await this.prisma.training.findFirst({
      where: {
        id: id
      }
    });

    return foundTraining;
  }

  public async findTrainingsByCreatorId(id: UUID): Promise<TrainingEntityInterface[] | null> {
    const foundTrainings = await this.prisma.training.findMany({
      where: {
        trainingCreatorId: id
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
}

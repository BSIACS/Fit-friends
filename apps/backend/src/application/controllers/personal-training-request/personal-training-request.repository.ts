import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UUID } from '../../../types/uuid.type';
import { PersonalTrainingRequestStatusEnum } from '../../../types/personal-training-request-status.enum';
import { PersonalTrainingRequestEntityInterface } from '../../../entities/personal-training-request.entity';

@Injectable()
export class PersonalTrainingRequestRepository {

  constructor(private readonly prisma: PrismaService) { }

  public async findById(id: UUID): Promise<PersonalTrainingRequestEntityInterface> {
    const foundPersonalTrainingRequest = await this.prisma.personalTrainingRequest.findFirst({
      where: {
        id: id
      }
    });

    return foundPersonalTrainingRequest;
  }

  public async getUnderConsideration(requesterId: UUID, responserId: UUID): Promise<PersonalTrainingRequestEntityInterface> {
    const foundPersonalTrainingRequest = await this.prisma.personalTrainingRequest.findFirst({
      where: {
        requestorId: requesterId,
        responserId: responserId,
        status: PersonalTrainingRequestStatusEnum.UNDER_CONSIDERATION
      }
    });

    return foundPersonalTrainingRequest;
  }

  public async create(requesterId: UUID, responserId: UUID): Promise<PersonalTrainingRequestEntityInterface> {
    const createdAt = new Date();
    const createdPersonalTrainingRequest = await this.prisma.personalTrainingRequest.create({
      data: {
        requestorId: requesterId,
        responserId: responserId,
        createdAt: createdAt,
        statusChangedAt: createdAt,
        status: PersonalTrainingRequestStatusEnum.UNDER_CONSIDERATION
      }
    });

    return createdPersonalTrainingRequest;
  }

  public async update(id: UUID, newStatus: PersonalTrainingRequestStatusEnum): Promise<PersonalTrainingRequestEntityInterface> {
    const updatedPersonalTrainingRequest = await this.prisma.personalTrainingRequest.update({
      where: {
        id: id
      },
      data: {
        status: newStatus
      }
    });

    return updatedPersonalTrainingRequest;
  }
}

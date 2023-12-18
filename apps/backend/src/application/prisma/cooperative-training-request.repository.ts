import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UUID } from '../../types/uuid.type';
import { TrainingRequestStatusEnum } from '../../types/training-request-status.enum';
import { GetAllForRequesterDto } from '../controllers/training-request/dto/get-all-for-requester.dto';
import { CooperativeTrainingRequestEntityInterface } from '../../entities/cooperative-training-request.entity';

@Injectable()
export class CooperativeTrainingRequestRepository {

  constructor(private readonly prisma: PrismaService) { }

  public async findById(id: UUID): Promise<CooperativeTrainingRequestEntityInterface> {
    const foundPersonalTrainingRequest = await this.prisma.cooperativeTrainingRequest.findFirst({
      where: {
        id: id
      }
    });

    return foundPersonalTrainingRequest;
  }

  public async findAllByRequesterId(requesterId: UUID, dto: GetAllForRequesterDto): Promise<CooperativeTrainingRequestEntityInterface[]> {
    const foundPersonalTrainingRequest = await this.prisma.cooperativeTrainingRequest.findMany({
      where: {
        requesterId: requesterId,
        status: dto.status ? dto.status : undefined,
      }
    });

    return foundPersonalTrainingRequest;
  }

  public async findAllByResponserId(responserId: UUID, dto: GetAllForRequesterDto): Promise<CooperativeTrainingRequestEntityInterface[]> {
    const foundPersonalTrainingRequest = await this.prisma.cooperativeTrainingRequest.findMany({
      where: {
        responserId: responserId,
        status: dto.status ? dto.status : undefined,
      }
    });

    return foundPersonalTrainingRequest;
  }

  public async create(requesterId: UUID, responserId: UUID): Promise<CooperativeTrainingRequestEntityInterface> {
    const createdAt = new Date();
    const createdPersonalTrainingRequest = await this.prisma.cooperativeTrainingRequest.create({
      data: {
        requesterId: requesterId,
        responserId: responserId,
        createdAt: createdAt,
        statusChangedAt: createdAt,
        status: TrainingRequestStatusEnum.UNDER_CONSIDERATION
      }
    });

    return createdPersonalTrainingRequest;
  }

  public async update(id: UUID, newStatus: TrainingRequestStatusEnum): Promise<CooperativeTrainingRequestEntityInterface> {
    const updatedPersonalTrainingRequest = await this.prisma.cooperativeTrainingRequest.update({
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

import { UUID } from '../../../types/uuid.type';
import { TrainerEntityInterface } from '../../../entities/trainer-entity.interface';
import { UserEntityInterface } from '../../../entities/user-entity.interface';
import { UsersRepository } from '../../prisma/users.repository';
import { PersonalTrainingRequestRepository } from '../../prisma/personal-training-request.repository';
import { PersonalTrainingRequestEntityInterface } from '../../../entities/personal-training-request.entity';
import { UserDoesNotExistsException } from '../../../exceptions/user-does-not-exists.exception';
import { BadRequestException, Injectable } from '@nestjs/common';
import { TrainingRequestStatusEnum } from '../../../types/training-request-status.enum';
import { PersonalTrainingRequestDoesNotExistsException } from '../../../exceptions/personal-training-request-does-not-exists.exception';
import { WrongResponserException } from '../../../exceptions/wrong-responser.exception';
import { GetAllForRequesterDto } from './dto/get-all-for-requester.dto';
import { CooperativeTrainingRequestRepository } from '../../prisma/cooperative-training-request.repository';
import { CooperativeTrainingRequestEntityInterface } from '../../../entities/cooperative-training-request.entity';


@Injectable()
export class TrainingRequestService {

  constructor(
    private readonly personalTrainingRequestRepository: PersonalTrainingRequestRepository,
    private readonly cooperativeTrainingRequestRepository: CooperativeTrainingRequestRepository,
    private readonly usersRepository: UsersRepository
  ) { }

  public async getUnderConsideration(requesterId: UUID, responserId: UUID): Promise<PersonalTrainingRequestEntityInterface> {
    if(requesterId === responserId){
      throw new WrongResponserException(responserId);
    }

    let foundResponser: UserEntityInterface | TrainerEntityInterface = await this.usersRepository.findUserById(responserId);

    if(!foundResponser){
      foundResponser = await this.usersRepository.findTrainerById(responserId);
    }

    if(!foundResponser){
      throw new UserDoesNotExistsException(responserId, 'id');
    }

    const foundPersonalTrainingRequest = await this.personalTrainingRequestRepository.getUnderConsideration(requesterId, responserId);

    return foundPersonalTrainingRequest;
  }

  public async getPersonalTrainingsByRequesterId(requesterId: UUID, dto: GetAllForRequesterDto): Promise<PersonalTrainingRequestEntityInterface[]> {
    let foundPersonalTrainingRequest;

    try {
      foundPersonalTrainingRequest = await this.personalTrainingRequestRepository.findAllByRequesterId(requesterId, dto);
    } catch (error) {
      throw new BadRequestException();
    }

    return foundPersonalTrainingRequest;
  }

  public async getPersonalTrainingsByResponserId(responserId: UUID, dto: GetAllForRequesterDto): Promise<PersonalTrainingRequestEntityInterface[]> {
    let foundPersonalTrainingRequest;

    try {
      foundPersonalTrainingRequest = await this.personalTrainingRequestRepository.findAllByResponserId(responserId, dto);
    } catch (error) {
      throw new BadRequestException();
    }

    return foundPersonalTrainingRequest;
  }

  public async getCooperativeTrainingsByResponserId(responserId: UUID, dto: GetAllForRequesterDto): Promise<PersonalTrainingRequestEntityInterface[]> {
    let foundCooperativeTrainingRequest;

    try {
      foundCooperativeTrainingRequest = await this.cooperativeTrainingRequestRepository.findAllByResponserId(responserId, dto);
    } catch (error) {
      throw new BadRequestException();
    }

    return foundCooperativeTrainingRequest;
  }
  public async getCooperativeTrainingsByRequesterId(responserId: UUID, dto: GetAllForRequesterDto): Promise<PersonalTrainingRequestEntityInterface[]> {
    let foundCooperativeTrainingRequest;

    try {
      foundCooperativeTrainingRequest = await this.cooperativeTrainingRequestRepository.findAllByRequesterId(responserId, dto);
    } catch (error) {
      throw new BadRequestException();
    }

    return foundCooperativeTrainingRequest;
  }

  public async createPersonalTrainingRequest(requesterId: UUID, responserId: UUID): Promise<PersonalTrainingRequestEntityInterface> {
    if(requesterId === responserId){
      throw new WrongResponserException(responserId);
    }

    let foundResponser: UserEntityInterface | TrainerEntityInterface = await this.usersRepository.findUserById(responserId);

    if(!foundResponser){
      foundResponser = await this.usersRepository.findTrainerById(responserId);
    }

    if(!foundResponser){
      throw new UserDoesNotExistsException(responserId, 'id');
    }

    const createdPersonalTrainingRequest = await this.personalTrainingRequestRepository.create(requesterId, responserId);

    return createdPersonalTrainingRequest;
  }

  public async createCooperativeTrainingRequest(requesterId: UUID, responserId: UUID): Promise<CooperativeTrainingRequestEntityInterface> {
    if(requesterId === responserId){
      throw new WrongResponserException(responserId);
    }

    let foundResponser: UserEntityInterface | TrainerEntityInterface = await this.usersRepository.findUserById(responserId);

    if(!foundResponser){
      foundResponser = await this.usersRepository.findTrainerById(responserId);
    }

    if(!foundResponser){
      throw new UserDoesNotExistsException(responserId, 'id');
    }

    const createdCooperativeTrainingRequest = await this.cooperativeTrainingRequestRepository.create(requesterId, responserId);

    return createdCooperativeTrainingRequest;
  }

  public async updatePersonalTrainingRequest(id: UUID, responserId: UUID, newStatus: TrainingRequestStatusEnum): Promise<PersonalTrainingRequestEntityInterface> {
    let foundPersonalTrainingRequest;

    try {
      foundPersonalTrainingRequest = await this.personalTrainingRequestRepository.findById(id);
    } catch (error) {
      throw new PersonalTrainingRequestDoesNotExistsException(id)
    }

    if(foundPersonalTrainingRequest.responserId !== responserId){
      throw new WrongResponserException(responserId);
    }

    const updatedPersonalTrainingRequest = await this.personalTrainingRequestRepository.update(id, newStatus)

    return updatedPersonalTrainingRequest;
  }

  public async updateCooperativeTrainingRequest(id: UUID, responserId: UUID, newStatus: TrainingRequestStatusEnum): Promise<CooperativeTrainingRequestEntityInterface> {
    let foundCooperativeTrainingRequest;

    try {
      foundCooperativeTrainingRequest = await this.cooperativeTrainingRequestRepository.findById(id);
    } catch (error) {
      throw new PersonalTrainingRequestDoesNotExistsException(id)
    }

    if(foundCooperativeTrainingRequest.responserId !== responserId){
      throw new WrongResponserException(responserId);
    }

    const updatedCooperativeTrainingRequest = await this.cooperativeTrainingRequestRepository.update(id, newStatus)

    return updatedCooperativeTrainingRequest;
  }

}

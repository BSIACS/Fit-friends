import { UUID } from '../../../types/uuid.type';
import { TrainerEntityInterface } from '../../../entities/trainer-entity.interface';
import { UserEntityInterface } from '../../../entities/user-entity.interface';
import { UsersRepository } from '../../prisma/users.repository';
import { PersonalTrainingRequestRepository } from './personal-training-request.repository';
import { PersonalTrainingRequestEntityInterface } from '../../../entities/personal-training-request.entity';
import { UserDoesNotExistsException } from '../../../exceptions/user-does-not-exists.exception';
import { Injectable } from '@nestjs/common';
import { PersonalTrainingRequestStatusEnum } from '../../../types/personal-training-request-status.enum';
import { PersonalTrainingRequestDoesNotExistsException } from '../../../exceptions/personal-training-request-does-not-exists.exception';
import { WrongResponserException } from '../../../exceptions/wrong-responser.exception';


@Injectable()
export class PersonalTrainingRequestService {

  constructor(
    private readonly personalTrainingRequestRepository: PersonalTrainingRequestRepository,
    private readonly usersRepository: UsersRepository
  ) { }

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

  public async changeStatus(id: UUID, responserId: UUID, newStatus: PersonalTrainingRequestStatusEnum): Promise<PersonalTrainingRequestEntityInterface> {
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

}

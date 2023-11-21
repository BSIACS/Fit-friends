import { Module } from '@nestjs/common';
import { PersonalTrainingRequestRepository } from './personal-training-request.repository';
import { PersonalTrainingRequestController } from './personal-training-request.controller';
import { UsersRepository } from '../../prisma/users.repository';
import { PersonalTrainingRequestService } from './personal-training-request.service';



@Module({
  imports: [],
  controllers: [PersonalTrainingRequestController],
  providers: [UsersRepository, PersonalTrainingRequestService, PersonalTrainingRequestRepository],
  exports: []
})
export class PersonalTrainingRequestModule { }

import { Module } from '@nestjs/common';
import { PersonalTrainingRequestRepository } from '../../prisma/personal-training-request.repository';
import { TrainingRequestController } from './training-request.controller';
import { UsersRepository } from '../../prisma/users.repository';
import { TrainingRequestService } from './training-request.service';
import { CooperativeTrainingRequestRepository } from '../../prisma/cooperative-training-request.repository';



@Module({
  imports: [],
  controllers: [TrainingRequestController],
  providers: [UsersRepository, TrainingRequestService, PersonalTrainingRequestRepository, CooperativeTrainingRequestRepository],
  exports: []
})
export class TrainingRequestModule { }

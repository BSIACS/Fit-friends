import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PersonalTrainingRequestRepository } from './personal-training-request.repository';
import { PersonalTrainingRequestController } from './personal-training-request.controller';
import { UsersRepository } from '../users/users.repository';
import { PersonalTrainingRequestService } from './personal-training-request.service';



@Module({
  imports: [],
  controllers: [PersonalTrainingRequestController],
  providers: [PrismaService, UsersRepository, PersonalTrainingRequestService, PersonalTrainingRequestRepository],
  exports: []
})
export class PersonalTrainingRequestModule { }

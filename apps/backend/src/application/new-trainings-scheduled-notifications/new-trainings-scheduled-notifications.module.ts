import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NewTrainingsScheduledNotificationsRepository } from './new-trainings-scheduled-notifications.repository';


@Module({
  imports: [],
  controllers: [],
  providers: [NewTrainingsScheduledNotificationsRepository, PrismaService],
})
export class NewTrainingsScheduledNotificationsModule { }

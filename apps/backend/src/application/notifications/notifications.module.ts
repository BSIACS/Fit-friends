import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsRepository } from './notitfications.repository';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';



@Module({
  imports: [],
  controllers: [NotificationsController],
  providers: [PrismaService, NotificationsRepository, NotificationsService],
  exports: []
})
export class NotitficationsModule { }

import { Module } from '@nestjs/common';
import { NotificationsRepository } from '../../prisma/notitfications.repository';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';



@Module({
  imports: [],
  controllers: [NotificationsController],
  providers: [NotificationsRepository, NotificationsService],
  exports: []
})
export class NotitficationsModule { }

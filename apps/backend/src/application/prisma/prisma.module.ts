import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { NotificationsRepository } from './notitfications.repository';
import { ReviewsRepository } from './reviews.repository';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, NotificationsRepository, ReviewsRepository],
  exports: [PrismaService],
})
export class PrismaModule {}

import { Module } from '@nestjs/common';
import { TrainerAccountController } from './trainer-account.controller';
import { TrainerAccountService } from './trainer-account.service';
import { TrainingModule } from '../trainings/training.module';
import { PrismaService } from '../prisma/prisma.service';
import { PurchasesModule } from '../purchases/purchases.module';


@Module({
  imports: [TrainingModule, PurchasesModule],
  controllers: [TrainerAccountController],
  providers: [TrainerAccountService, PrismaService],
})
export class TrainerAccountModule { }

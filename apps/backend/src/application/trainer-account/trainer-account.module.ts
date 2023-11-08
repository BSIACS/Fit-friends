import { Module } from '@nestjs/common';
import { TrainerAccountController } from './trainer-account.controller';
import { TrainerAccountService } from './trainer-account.service';
import { TrainingModule } from '../trainings/training.module';
import { PrismaService } from '../prisma/prisma.service';
import { PurchasesModule } from '../purchases/purchases.module';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenRepository } from '../refresh-token/refresh-tokens.repository';
import { UsersModule } from '../users/users.module';


@Module({
  imports: [TrainingModule, PurchasesModule, UsersModule],
  controllers: [TrainerAccountController],
  providers: [TrainerAccountService, PrismaService, JwtService, RefreshTokenRepository],
})
export class TrainerAccountModule { }

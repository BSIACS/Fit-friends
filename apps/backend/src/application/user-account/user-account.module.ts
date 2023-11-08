import { Module } from '@nestjs/common';
import { UserAccountController } from './user-account.controller';
import { UserAccountService } from './user-account.service';
import { UsersModule } from '../users/users.module';
import { UsersRepository } from '../users/users.repository';
import { PrismaService } from '../prisma/prisma.service';
import { UserBalanceRepository } from '../user-balance/user-balance.repository';
import { TrainingsRepository } from '../trainings/trainings.repository';


@Module({
  imports: [UsersModule],
  controllers: [UserAccountController],
  providers: [UserAccountService, PrismaService, UsersRepository, UserBalanceRepository, TrainingsRepository],
})
export class UserAccountModule { }

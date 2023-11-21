import { Module } from '@nestjs/common';
import { UserAccountController } from './user-account.controller';
import { UserAccountService } from './user-account.service';
import { UsersModule } from '../users/users.module';
import { UsersRepository } from '../../prisma/users.repository';
import { UserBalanceRepository } from '../../prisma/user-balance.repository';
import { TrainingsRepository } from '../../prisma/trainings.repository';


@Module({
  imports: [UsersModule],
  controllers: [UserAccountController],
  providers: [UserAccountService, UsersRepository, UserBalanceRepository, TrainingsRepository],
})
export class UserAccountModule { }

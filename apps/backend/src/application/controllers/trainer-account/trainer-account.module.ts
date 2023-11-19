import { Module } from '@nestjs/common';
import { TrainerAccountController } from './trainer-account.controller';
import { TrainerAccountService } from './trainer-account.service';
import { TrainingsModule } from '../trainings/training.module';
import { PrismaService } from '../../prisma/prisma.service';
import { PurchasesModule } from '../../purchases/purchases.module';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenRepository } from '../../refresh-token/refresh-tokens.repository';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../../mail/mail.module';
import { MailService } from '../../mail/mail.service';
import { NewTrainingsScheduledNotificationsModule } from '../../new-trainings-scheduled-notifications/new-trainings-scheduled-notifications.module';
import { NewTrainingsScheduledNotificationsRepository } from '../../new-trainings-scheduled-notifications/new-trainings-scheduled-notifications.repository';
import { UsersRepository } from '../users/users.repository';
import { TrainingsService } from '../trainings/trainings.service';


@Module({
  imports: [TrainingsModule, PurchasesModule, UsersModule, MailModule, NewTrainingsScheduledNotificationsModule],
  controllers: [TrainerAccountController],
  providers: [
    TrainerAccountService,
    PrismaService,
    JwtService,
    RefreshTokenRepository,
    MailService,
    NewTrainingsScheduledNotificationsRepository,
    UsersRepository,
    TrainingsService
  ],
})
export class TrainerAccountModule { }

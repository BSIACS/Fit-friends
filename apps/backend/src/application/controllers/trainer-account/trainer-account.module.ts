import { Module } from '@nestjs/common';
import { TrainerAccountController } from './trainer-account.controller';
import { TrainerAccountService } from './trainer-account.service';
import { TrainingsModule } from '../trainings/training.module';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenRepository } from '../../refresh-token/refresh-tokens.repository';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../../mail/mail.module';
import { MailService } from '../../mail/mail.service';
import { NewTrainingsScheduledNotificationsRepository } from '../../prisma/new-trainings-scheduled-notifications.repository';
import { UsersRepository } from '../../prisma/users.repository';
import { TrainingsService } from '../trainings/trainings.service';
import { PurchasesRepository } from '../../prisma/purchases.repository';
import { UploadFileManagerService } from '../../upload-file-manager/upload-file-manager.service';
import { UploadFileManagerModule } from '../../upload-file-manager/upload-file-manager';


@Module({
  imports: [TrainingsModule, UsersModule, MailModule, UploadFileManagerModule],
  controllers: [TrainerAccountController],
  providers: [
    TrainerAccountService,
    JwtService,
    RefreshTokenRepository,
    MailService,
    NewTrainingsScheduledNotificationsRepository,
    UsersRepository,
    TrainingsService,
    PurchasesRepository,
    UploadFileManagerService
  ],
})
export class TrainerAccountModule { }

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import applicationConfig from '../config/application.config';
import { ENV_FILE_PATH } from '../constants';
import { validateEnvironments } from '../config/validation/env.validation';
import { jwtOptions } from '../config/jwt.config';
import { UsersModule } from './users/users.module';
import { TrainerAccountModule } from './trainer-account/trainer-account.module';
import { UserAccountModule } from './user-account/user-account.module';
import { mailOptions } from '../config/mail.config';
import { TrainingsModule } from './trainings/training.module';
import { ReviewsModule } from './reviews/reviews.module';
import { NotitficationsModule } from './notifications/notifications.module';
import { PersonalTrainingRequestModule } from './personal-training-request/personal-training-request.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [applicationConfig, jwtOptions, mailOptions],
      validate: validateEnvironments,
    }),
    UsersModule,
    TrainerAccountModule,
    UserAccountModule,
    TrainingsModule,
    ReviewsModule,
    NotitficationsModule,
    PersonalTrainingRequestModule
  ],
  controllers: [],
  providers: [],
})
export class ApplicationModule { }

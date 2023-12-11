import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import applicationConfig from '../config/application.config';
import { ENV_FILE_PATH } from '../constants';
import { validateEnvironments } from '../config/validation/env.validation';
import { jwtOptions } from '../config/jwt.config';
import { UsersModule } from './controllers/users/users.module';
import { TrainerAccountModule } from './controllers/trainer-account/trainer-account.module';
import { UserAccountModule } from './controllers/user-account/user-account.module';
import { mailOptions } from '../config/mail.config';
import { TrainingsModule } from './controllers/trainings/training.module';
import { ReviewsModule } from './controllers/reviews/reviews.module';
import { NotitficationsModule } from './controllers/notifications/notifications.module';
import { PersonalTrainingRequestModule } from './controllers/personal-training-request/personal-training-request.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [applicationConfig, jwtOptions, mailOptions],
      validate: validateEnvironments,
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'backend/assets'),
    // }),
    UsersModule,
    TrainerAccountModule,
    UserAccountModule,
    TrainingsModule,
    ReviewsModule,
    NotitficationsModule,
    PersonalTrainingRequestModule,
    PrismaModule
  ],
  controllers: [],
  providers: [],
})
export class ApplicationModule { }

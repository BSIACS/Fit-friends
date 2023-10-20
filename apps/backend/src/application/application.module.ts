import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import applicationConfig from '../config/application.config';
import { UsersController } from './users/users.controller';
import { ENV_FILE_PATH } from '../constants';
import { validateEnvironments } from '../config/validation/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [applicationConfig],
      validate: validateEnvironments,
    })
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule { }

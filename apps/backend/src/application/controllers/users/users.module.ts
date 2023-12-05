import { Global, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../../config/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersService } from './users.service';
import { UsersRepository } from '../../prisma/users.repository';
import { RefreshTokenRepository } from '../../refresh-token/refresh-tokens.repository';
import { JwtRefreshStrategy } from './strategies/jwt-refresh-strategy';
import { UploadFileManagerModule } from '../../upload-file-manager/upload-file-manager';
import { UploadFileManagerService } from '../../upload-file-manager/upload-file-manager.service';

@Global()
@Module({
  imports: [
    PassportModule,
    UploadFileManagerModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, JwtStrategy, RefreshTokenRepository, JwtRefreshStrategy, UploadFileManagerService],
  exports: [UsersService]
})
export class UsersModule { }

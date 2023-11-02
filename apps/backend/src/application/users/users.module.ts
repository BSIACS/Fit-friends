import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../config/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { RefreshTokenRepository } from '../refresh-token/refresh-tokens.repository';
import { JwtRefreshStrategy } from './strategies/jwt-refresh-strategy';
import { AuthorizationController } from './authorization.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    })
  ],
  controllers: [AuthorizationController, UsersController],
  providers: [PrismaService, UsersService, UsersRepository, JwtStrategy, RefreshTokenRepository, JwtRefreshStrategy],
})
export class UsersModule { }

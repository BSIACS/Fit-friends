import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RefreshTokenRepository } from './refresh-tokens.repository';


@Module({
  imports: [],
  providers: [PrismaService],
  exports: [RefreshTokenRepository]
})
export class RefreshTokenModule { }

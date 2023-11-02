import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PurchasesRepository } from './purchases.repository';


@Module({
  imports: [],
  controllers: [],
  providers: [PurchasesRepository, PrismaService],
  exports: [PurchasesRepository]
})
export class PurchasesModule { }

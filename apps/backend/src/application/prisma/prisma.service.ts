import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{
  async onModuleInit(){
    console.info('[PrismaService] - trying connect to database');
    await this.$connect();
    console.info('[PrismaService] - connected');
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close()
      console.info('[PrismaService] - connection closed');
    })
  }
}

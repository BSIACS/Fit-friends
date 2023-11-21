import { INestApplication, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{
  private readonly logger;

  constructor() {
    super();
    this.logger = new Logger(PrismaService.name);
  }

  async onModuleInit(){
    this.logger.verbose('Try to connect to DB');
    await this.$connect();
    this.logger.verbose('DB connection established');
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close()
    })
  }
}

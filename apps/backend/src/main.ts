import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ApplicationModule } from './application/application.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  const configService = app.get(ConfigService);

  const globalPrefix = configService.get('application.globalPrefix');
  app.setGlobalPrefix(globalPrefix);

  const port = configService.get('application.port') || 3000;
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

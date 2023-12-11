import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ApplicationModule } from './application/application.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule, {cors: true});

  const configService = app.get(ConfigService);

  app.use('/assets', express.static(join(__dirname, '..', 'backend/assets'))); ///http://localhost:3042/static/img/content/photo-1.png

  const globalPrefix = configService.get('application.globalPrefix');
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
  .setTitle('The «Fit-friends» service')
  .setVersion('1.0')
  .build();

  const port = configService.get('application.port') || 3000;

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document)

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );

  Logger.log(`Assets rootPath: ${join(__dirname, '..', 'backend/assets')}`)
}

bootstrap();

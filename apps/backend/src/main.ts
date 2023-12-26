import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ApplicationModule } from './application/application.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule, {cors: {
    origin: 'http://localhost:4200',
  }});

  app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Accept,Authorization,Origin");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });

  const configService = app.get(ConfigService);

  app.use('/assets', express.static(join(__dirname, '..', 'backend/assets')));
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

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ApplicationModule } from './application/application.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  const configService = app.get(ConfigService);

  const globalPrefix = configService.get('application.globalPrefix');
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
  .setTitle('The «Fit-friends» service')
  .setDescription('Fit-friends service API')
  .setVersion('1.0')
  .build();

  const port = configService.get('application.port') || 3000;

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document)

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

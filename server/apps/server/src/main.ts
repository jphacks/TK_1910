import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import express = require('express');

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: true, transform: true }));
  const options = new DocumentBuilder()
    .setTitle('Popcorn Order API')
    .setDescription('Popcorn Order API Docs.')
    .setVersion('1.0')
    .addBearerAuth('Authorization', 'header', 'apiKey')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  app.enableCors();
  app.use('/', express.static(process.cwd() + '/public'));
  await app.listen(3000);
}
bootstrap();

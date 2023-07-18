import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // адрес фронт-энд приложения
  const app = await NestFactory.create(AppModule, { cors:{origin: "http://localhost:8081", credentials: true} });  
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  // перейти на страницу документации 
  // http://localhost:300/api
  const config = new DocumentBuilder()
  .setTitle('[HTTPS Hooligans] Документация проекта')
  .setDescription('Здесь собраны все энд-поинты проекта. Я максимально подробно все описал, чтобы вам было приятно работать с серверной частью проекта. Удачи вам, дорогие фронт-эндеры. С любовью, Кирилл')
  .setVersion('0.4')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // порт, на котором запускается серверное приложение
  await app.listen(3000);
}
bootstrap();

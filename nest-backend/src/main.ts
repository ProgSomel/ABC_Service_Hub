import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(path.join(__dirname, '../uploads')); //to use file publically ... so that we can access from anywhere or from browser
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

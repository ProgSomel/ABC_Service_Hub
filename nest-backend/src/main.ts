import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.use(
    session({
      secret: process.env.JWT_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 300000,
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();

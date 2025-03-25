/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import {
  corsConfig,
  HttpExceptionFilter,
  RequestLoggerMiddleware,
  setupSwagger,
  WinstonConfig,
} from '@shared/server';

const globalPrefix = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix(globalPrefix);

  // ✅ Override NestJS Logger with Winston
  app.useLogger(app.get(WinstonConfig));

  // ✅ Enable API Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: configService.get<string>('API_VERSION'),
  });

  // ✅ Security Middleware First
  app.use(helmet());
  app.use(cookieParser()); // Parses cookies before request logging
  app.use(compression()); // Compress responses after security middleware

  // ✅ Global Pipes - Sanitization & Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip non-whitelisted properties
      forbidNonWhitelisted: true, // Reject requests with unknown properties
      transform: true, // Automatically transform payloads to DTOs
    })
  );

  // ✅ Enable CORS after Security Middleware
  app.enableCors(corsConfig(configService));

  // ✅ Setup Swagger
  setupSwagger(app, configService);

  app.useGlobalFilters(new HttpExceptionFilter());

  // ✅ Start Listening
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  return port;
}

// ✅ Ensure bootstrap runs
bootstrap().then((port) =>
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  )
);

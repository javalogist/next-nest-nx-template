/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { setupSwagger } from './config/swagger.config';
import { ConfigService } from '@nestjs/config';
import { SanitizePipe } from './utils/pipe/sanitize.pipe';
import helmet from 'helmet';
import { RequestLoggerMiddleware } from './utils/middleware/request-logger.middleware';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { WinstonConfig } from './config/winston.config';

const globalPrefix = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // ✅ Set Global Prefix Early
  app.setGlobalPrefix(globalPrefix);

  // ✅ Override NestJS Logger with Winston
  app.useLogger(app.get(WinstonConfig));

  // ✅ Security Middleware First
  app.use(helmet());
  app.use(
    helmet.hsts({
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true
    })
  );
  app.use(cookieParser()); // Parses cookies before request logging
  app.use(compression()); // Compress responses after security middleware

  // ✅ Custom Middleware Next
 // app.use( RequestLoggerMiddleware);

  // ✅ Enable API Versioning Early
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  });

  // ✅ Setup Swagger after Versioning
  setupSwagger(app);

  // ✅ Global Pipes - Sanitization & Validation
  app.useGlobalPipes(new SanitizePipe());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip non-whitelisted properties
      forbidNonWhitelisted: true, // Reject requests with unknown properties
      transform: true // Automatically transform payloads to DTOs
    })
  );

  // ✅ Enable CORS after Security Middleware
  app.enableCors(configService.get('cors'));

  // ✅ Start Listening
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  return port;
}

// ✅ Ensure bootstrap runs
bootstrap().then((port) => Logger.log(
  `🚀 Application is running on: http://localhost:${port}/${globalPrefix}}`
));


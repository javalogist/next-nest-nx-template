import { ConfigService } from '@nestjs/config';
import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';
import * as winstonMongoDB from 'winston-mongodb';

@Injectable()
export class WinstonConfig implements LoggerService {
  private logger: Logger;

  constructor(private configService: ConfigService) {
    const isProduction = process.env['NODE_ENV'] === 'production';
    const mongoUri = this.configService.get<string>('MONGO_URI');
    const appName = this.configService.get<string>('APP_NAME');

    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.splat(),
        format.printf(({ timestamp, level, message, context }) => {
          return `${timestamp} [${
            context || appName
          }] ${level}: ${message}`;
        })
      ),
      transports: [
        new transports.Console(),
        ...(isProduction
          ? [
            new winstonMongoDB.MongoDB({
              level: 'info',
              db: mongoUri!,
              collection: 'app_logs',
              capped: true,
              cappedSize: 5242880
            }),
            new winstonMongoDB.MongoDB({
              level: 'error',
              db: mongoUri!,
              collection: 'error_logs',
              capped: true,
              cappedSize: 5242880
            })
          ]
          : [])
      ]
    });
  }

  log(message: any, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: any, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: any, context?: string) {
    this.logger.warn(message, { context });
  }

  debug?(message: any, context?: string) {
    this.logger.debug(message, { context });
  }

  verbose?(message: any, context?: string) {
    this.logger.verbose(message, { context });
  }
}

import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('RequestLogger');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body, query, params } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - startTime;
      const logMessage = `[${method}] ${originalUrl} | Status: ${res.statusCode} | Duration: ${duration}ms`;

      // Log request details in development only
      if (process.env.NODE_ENV === 'development') {
        this.logger.log(
          `${logMessage} | Params: ${JSON.stringify(
            params
          )} | Query: ${JSON.stringify(query)} | Body: ${JSON.stringify(body)}`
        );
      } else {
        // Minimal logging in production
        this.logger.log(logMessage);
      }
    });

    next();
  }
}

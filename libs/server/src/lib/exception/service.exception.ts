import { HttpException, HttpStatus } from '@nestjs/common';

export class ServiceException extends HttpException {
  constructor(message: string, error?: any, status: number = HttpStatus.OK) {

    // If we're in dev mode, add stack trace to the response
    const response = {
      status,
      message,
      error: error || null,
      stack: new Error().stack // Include stack trace only in development
    };

    super(response, status);
  }
}

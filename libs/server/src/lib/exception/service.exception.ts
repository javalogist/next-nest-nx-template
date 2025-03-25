import { HttpException, HttpStatus } from '@nestjs/common';

export class ServiceException extends HttpException {
  constructor(
    message: string,
    error?: any,
    data?: any,
    status: number = HttpStatus.OK
  ) {
    const response = {
      status,
      message,
      data: data || null,
      error: error || 'Validation failed',
      stack: new Error().stack,
    };

    super(response, status);
  }
}

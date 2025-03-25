import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../dtos';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse: any = exception.getResponse();
    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : exceptionResponse.message || 'Internal server error';

    const isDevMode = process.env['NODE_ENV'] === 'development';

    // If we're in development mode, attach the stack trace; otherwise, send an empty string.
    const stackTrace = isDevMode
      ? (exception.stack || 'Stack trace not available')
      : '';

    // Send the response with the error details.
    response
      .status(status)
      .json(ApiResponse.error(message, null, stackTrace));
  }
}

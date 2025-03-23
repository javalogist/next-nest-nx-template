import { HttpException, HttpStatus } from '@nestjs/common';

export class ServiceException extends HttpException {
  constructor(message: string, error?: any) {
    super(
      {
        status: 200,
        message,
        error
      },
      HttpStatus.OK
    );
  }
}

import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import {
  ApiResponse,
  ErrorResponse,
  SuccessResponse,
} from '../dtos/api.response.dto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        response.status(200);
        // ✅ Check if the response is SuccessResponse
        if (data instanceof SuccessResponse) {
          return ApiResponse.success(data.data, data.message);
        }

        // ❌ Check if the response is ErrorResponse
        if (data instanceof ErrorResponse) {
          return ApiResponse.error(
            data.message,
            process.env['NODE_ENV'] === 'development' ? data.stackTrace : '',
            data.data
          );
        }

        throw new HttpException(
          'Proper formatting of response not implemented. Development issue',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      })
    );
  }
}

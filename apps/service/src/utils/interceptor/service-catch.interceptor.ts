import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';
import { ServiceException } from '../exception/service.exception';
import { ErrorResponse } from '../dto/api.response.dto';


@Injectable()
export class ServiceCatchInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof ServiceException) {
          // Return custom ErrorResponse for ServiceException
          return throwError(() => new ErrorResponse(err.message, err.getResponse()));
        }
        // Re-throw for HttpExceptionFilter to catch
        return throwError(() => err);
      })
    );
  }
}


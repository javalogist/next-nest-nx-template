import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, throwError, of } from 'rxjs';
import { ServiceException } from '../exception/service.exception';
import { ErrorResponse } from '../dtos/api.response.dto';

@Injectable()
export class ServiceCatchInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof ServiceException) {
          console.log('catching', `${err.message} and ${err.getResponse()}`);
          return of(new ErrorResponse(err.message, err.stack));
        }
        // Re-throw for HttpExceptionFilter to catch
        return throwError(() => err);
      })
    );
  }
}

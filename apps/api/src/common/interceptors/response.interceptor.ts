import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: true;
  data: T;
  message: string;
}

/**
 * Wraps every successful controller return value in the platform-wide
 * { success, data, message } envelope described in the API contract.
 * Controllers can still set `message` explicitly by returning
 * `{ __message, ...payload }`; otherwise a sensible default is used.
 */
@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((payload) => {
        const message =
          payload && typeof payload === 'object' && '__message' in payload
            ? (payload as any).__message
            : 'Success';
        const data =
          payload && typeof payload === 'object' && '__message' in payload
            ? (() => {
                const { __message, ...rest } = payload as any;
                return rest;
              })()
            : payload;
        return { success: true, data, message };
      }),
    );
  }
}

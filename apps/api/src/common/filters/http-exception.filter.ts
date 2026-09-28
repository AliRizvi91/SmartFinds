import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHttp = exception instanceof HttpException;
    const status = isHttp
      ? (exception as HttpException).getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = isHttp
      ? (exception as HttpException).getResponse()
      : undefined;

    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as any)?.message ??
          (exception as Error)?.message ??
          'Something went wrong';

    const errorCode =
      (exceptionResponse as any)?.error ??
      (isHttp ? (exception as HttpException).name : 'INTERNAL_SERVER_ERROR');

    if (!isHttp) {
      this.logger.error(
        `Unhandled exception on ${request.method} ${request.url}`,
        (exception as Error)?.stack,
      );
    }

    response.status(status).json({
      success: false,
      message: Array.isArray(message) ? message.join(', ') : message,
      error: errorCode,
    });
  }
}

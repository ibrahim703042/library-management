import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    this.logger.error(
      `Status: ${status} | Method: ${request.method} | URL: ${request.originalUrl} | Error: ${exception.message}`,
    );

    const errorDetails = exception.getResponse();

    response.status(status).json({
      error: true,
      errorDetails,
    });

    // response.
    // status(status)
    // .json({
    //   statusCode : status,
    //   timeStamp: new Date().toISOString(),
    //   path: request.url
    // });
  }
}

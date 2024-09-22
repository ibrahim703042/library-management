import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  NotFoundException,
  ConflictException,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { Response } from 'express';
import { MongooseError } from 'mongoose';
import { Inject, Logger } from '@nestjs/common';

@Injectable()
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 500;
    let message = 'Internal server error';
    let error = 'Unknown error';

    // Log the exception details
    this.logger.error(
      `Exception caught: ${exception instanceof Error ? exception.message : exception}`,
      exception instanceof Error ? exception.stack : '',
    );

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      error = this.handleHttpException(exception);
    } else if (exception instanceof MongooseError) {
      const mongooseError = exception as MongooseError;
      const mongooseErrorDetails = this.handleMongooseError(mongooseError);
      status = mongooseErrorDetails.status;
      message = mongooseErrorDetails.message;
      error = mongooseErrorDetails.error;
    } else if (exception instanceof Error) {
      if (
        exception.message.includes('ECONNREFUSED') ||
        exception.message.includes('ENOTFOUND')
      ) {
        status = 503; // Service Unavailable
        message = 'Service connection error';
        error = 'Service connection error';
      } else {
        message = exception.message || message;
        error = exception.name || error;
      }
    }

    // Log the response details
    this.logger.warn(`Responding with status ${status}: ${message} - ${error}`);

    return response.status(status).json({
      statusCode: status,
      message,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private handleHttpException(exception: HttpException): string {
    if (exception instanceof NotFoundException) {
      return 'Resource not found';
    } else if (exception instanceof ConflictException) {
      return 'Conflict occurred (e.g., unique constraint violation)';
    }
    return exception.message || 'HTTP exception occurred';
  }

  private handleMongooseError(mongooseError: MongooseError) {
    let status = 500;
    let message = 'Database error';
    let error = 'Database error';

    switch (mongooseError.name) {
      case 'ValidationError':
        status = 400;
        message = 'Validation error';
        error = mongooseError.message;
        break;
      case 'CastError':
        status = 400;
        message = 'Invalid data type';
        error = mongooseError.message;
        break;
      case 'MongoServerError':
        if ((mongooseError as any).code === 11000) {
          status = 409;
          message = 'Duplicate key error';
          const duplicateField = this.extractDuplicateField(
            mongooseError.message,
          );
          error = `Duplicate key error: ${duplicateField}`;
        }
        break;
      default:
        status = 500;
        message = 'Database error';
        error = mongooseError.message || 'Unknown database error';
    }

    return { status, message, error };
  }

  private extractDuplicateField(errorMessage: string): string {
    const match = errorMessage.match(/dup key: \{ : "([^"]+)" \}/);
    if (match) {
      return `Field with value "${match[1]}"`;
    }
    return 'Unknown duplicate field';
  }
}

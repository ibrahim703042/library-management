import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
  responseSuccess(data: any): any {
    return {
      statusCode: 200, // OK
      message: 'Success',
      data: data || [],
    };
  }

  responseCreated(data: any): any {
    return {
      statusCode: 201, // Created
      message: 'Resource created successfully',
      data: data || [],
    };
  }

  responseNoContent(): any {
    return {
      statusCode: 204, // No Content
      message: 'No content',
    };
  }

  responseBadRequest(error: string): any {
    return {
      statusCode: 400, // Bad Request
      message: error,
    };
  }

  responseUnauthorized(error: string): any {
    return {
      statusCode: 401, // Unauthorized
      message: error || 'Unauthorized',
    };
  }

  responseForbidden(error: string): any {
    return {
      statusCode: 403, // Forbidden
      message: error || 'Forbidden',
    };
  }

  responseNotFound(id: string): any {
    return {
      statusCode: 404, // Not Found
      message: `Resource not found with ID ${id}`,
    };
  }

  responseConflict(error: string): any {
    return {
      statusCode: 409, // Conflict
      message: error || 'Conflict',
    };
  }

  responseInternalServerError(error: string): any {
    return {
      statusCode: 500, // Internal Server Error
      message: error || 'Internal server error',
    };
  }

  responseServiceUnavailable(error: string): any {
    return {
      statusCode: 503, // Service Unavailable
      message: error || 'Service unavailable',
    };
  }

  validationError(error: string): any {
    return {
      statusCode: 422, // Unprocessable Entity
      message: error || 'Validation error',
    };
  }

  getPagination(page: number, size: number): { limit: number; offset: number } {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
  }
}

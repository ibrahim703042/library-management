import { Injectable } from '@nestjs/common';
import { Response } from 'express';

// Define interfaces for better type safety
interface ApiResponse {
  statusCode: number;
  message: string;
  data?: any;
  error?: string;
  timestamp?: string;
}

@Injectable()
export class ResponseService {
  success(data: any, message: string = 'Success'): ApiResponse {
    return {
      statusCode: 200,
      message,
      data: data ? data : [],
    };
  }

  responseError(message: string, statusCode: number = 400): ApiResponse {
    return {
      statusCode,
      message,
    };
  }

  responseInternalError(message: string): ApiResponse {
    return {
      statusCode: 500,
      message,
    };
  }

  validationError(message: string): ApiResponse {
    return {
      statusCode: 400,
      message,
    };
  }

  notFound(id: string): ApiResponse {
    return {
      statusCode: 404,
      message: `Not found ${id}`,
    };
  }

  static success(
    response: Response,
    data: any,
    message: string = 'Operation successful',
    statusCode: number = 200,
  ) {
    return response.status(statusCode).json({
      statusCode,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  static successCreate(response: Response, data: any) {
    return this.success(response, data, 'Data created successfully', 201);
  }

  static successRead(response: Response, data: any) {
    return this.success(response, data, 'Data fetched successfully');
  }

  static successUpdate(response: Response, data: any) {
    return this.success(response, data, 'Data updated successfully');
  }

  static successDelete(response: Response) {
    return this.success(response, null, 'Data deleted successfully');
  }

  static errorResponse(
    response: Response,
    exception: any,
    statusCode: number = 500,
    message: string = 'Internal server error',
  ) {
    return response.status(statusCode).json({
      statusCode,
      message,
      error: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
  getPagination(page: number, size: number): { limit: number; offset: number } {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
  }
}

// export class StandardResponse {
//   static success(
//     response: Response,
//     data: any,
//     message: string = 'Operation successful',
//     statusCode: number = 200,
//   ) {
//     return response.status(statusCode).json({
//       statusCode,
//       message,
//       data,
//       timestamp: new Date().toISOString(),
//     });
//   }

//   static successCreate(response: Response, data: any) {
//     return this.success(response, data, 'Data created successfully', 201);
//   }

//   static successRead(response: Response, data: any) {
//     return this.success(response, data, 'Data fetched successfully');
//   }

//   static successUpdate(response: Response, data: any) {
//     return this.success(response, data, 'Data updated successfully');
//   }

//   static successDelete(response: Response) {
//     return this.success(response, null, 'Data deleted successfully');
//   }

//   static errorResponse(
//     response: Response,
//     exception: any,
//     statusCode: number = 500,
//     message: string = 'Internal server error',
//   ) {
//     return response.status(statusCode).json({
//       statusCode,
//       message,
//       error: exception.message,
//       timestamp: new Date().toISOString(),
//     });
//   }
// }

const errors = {
  validationFailed: {
    statusCode: 400,
    message: 'Validation failed',
    error: 'Bad request',
    code: 'BAD_REQUEST',
  },

  unauthorized: {
    statusCode: 401,
    message: 'Unauthorized access',
    error: 'Unauthorized',
    code: 'UNAUTHORIZED',
  },

  forbidden: {
    statusCode: 403,
    message: 'Access forbidden',
    error: 'Forbidden',
    code: 'FORBIDDEN',
  },

  notFound: {
    statusCode: 404,
    message: 'Resource not found',
    error: 'Not found',
    code: 'NOT_FOUND',
  },

  methodNotAllowed: {
    statusCode: 405,
    message: 'Method not allowed',
    error: 'Method Not Allowed',
    code: 'METHOD_NOT_ALLOWED',
  },

  conflict: {
    statusCode: 409,
    message: 'Conflict occurred',
    error: 'Conflict',
    code: 'CONFLICT',
  },

  internalServerError: {
    statusCode: 500,
    message: 'Internal server error',
    error: 'Internal Server Error',
    code: 'INTERNAL_SERVER_ERROR',
  },

  notImplemented: {
    statusCode: 501,
    message: 'Not implemented',
    error: 'Not Implemented',
    code: 'NOT_IMPLEMENTED',
  },

  badGateway: {
    statusCode: 502,
    message: 'Bad gateway',
    error: 'Bad Gateway',
    code: 'BAD_GATEWAY',
  },

  serviceUnavailable: {
    statusCode: 503,
    message: 'Service unavailable',
    error: 'Service Unavailable',
    code: 'SERVICE_UNAVAILABLE',
  },

  gatewayTimeout: {
    statusCode: 504,
    message: 'Gateway timeout',
    error: 'Gateway Timeout',
    code: 'GATEWAY_TIMEOUT',
  },
};

export default errors;

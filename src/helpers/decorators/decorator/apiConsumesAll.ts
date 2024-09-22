import { applyDecorators } from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';

export function ApiConsumesAll() {
  return applyDecorators(
    ApiConsumes(
      'multipart/form-data',
      'application/x-www-form-urlencoded',
      'application/json',
    ),
  );
}

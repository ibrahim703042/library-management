import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import errors from 'src/Helpers/utils/errors';

@Injectable()
export class CustomPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    console.log('The value is', value);
    console.log('The metadata type is ', metadata.type);

    if (!value) {
      throw new HttpException(errors.validationFailed, HttpStatus.BAD_REQUEST);
    }

    if (typeof value !== 'string') {
      throw new HttpException(errors.unauthorized, HttpStatus.UNAUTHORIZED);
    }

    return value;
  }
}

import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as fs from 'fs-extra';

@Injectable()
export class DocumentValidatePipe implements PipeTransform {
  private readonly maxSize = 2 * 1024 * 1024; // 2 MB
  private readonly allowedTypes = ['application/pdf']; // Allowed MIME types

  async transform(value: any) {
    if (!value || !value.mimetype || !value.size) {
      throw new BadRequestException('File is not valid');
    }

    if (value.size > this.maxSize) {
      fs.remove(value.path);
      throw new BadRequestException('File size exceeds the limit');
    }

    if (!this.allowedTypes.includes(value.mimetype)) {
      fs.remove(value.path);
      throw new BadRequestException('Invalid file type');
    }

    // Check if the file exists (although this might not be necessary in most upload scenarios)
    const filePath = value.path; // Assuming the file object has a path property
    const fileExists = await fs.pathExists(filePath);
    if (!fileExists) {
      throw new BadRequestException('File does not exist');
    }

    return value;
  }
}

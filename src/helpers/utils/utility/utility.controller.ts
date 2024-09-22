import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { UtilityService } from './utility.service';

@Controller('utility')
export class UtilityController {
  constructor(private readonly utilityService: UtilityService) {}

  @Get('validate-email')
  validateEmail(@Query('email') email: string): string {
    if (!this.utilityService.validateEmail(email)) {
      throw new BadRequestException('Invalid email address or domain.');
    }
    return 'Email is valid and domain is allowed.';
  }

  @Get('server-ip')
  getServerIp(): string {
    return this.utilityService.getServerIp();
  }

  @Get('generate-code')
  generateCode(): string {
    return this.utilityService.codeGenerate();
  }

  @Get('has-internet')
  async checkInternetConnection(): Promise<boolean> {
    return await this.utilityService.hasInternetConnection();
  }

  @Get('generate-id')
  async generateID(): Promise<string> {
    return await this.utilityService.generateID();
  }

  @Get('encode-password')
  encodePassword(): string {
    const password = 'password123';
    return this.utilityService.encodePassword(password);
  }
}

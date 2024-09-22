import { Global, Module } from '@nestjs/common';
import { EmailVerificationService } from 'src/Helpers/services/email/email-verification';
import { EmailValidatorService } from 'src/Helpers/services/email/emailValidator';
import { IpGeolocationService } from 'src/Helpers/services/IpGeolocationService';
import { ResponseService } from 'src/Helpers/services/server/ResponseServer';
import { TranslateService } from 'src/Helpers/translate/translate.service';

@Global()
@Module({
  imports: [],
  providers: [
    IpGeolocationService,
    ResponseService,
    EmailVerificationService,
    EmailValidatorService,
    ResponseService,
    TranslateService,
  ],
  exports: [
    IpGeolocationService,
    ResponseService,
    EmailVerificationService,
    EmailValidatorService,
    ResponseService,
    TranslateService,
  ],
})
export class GlobalModule {}

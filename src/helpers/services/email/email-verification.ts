import { Injectable } from '@nestjs/common';
import * as EmailVerifier from 'email-verifier';

@Injectable()
export class EmailVerificationService {
  private verifier;

  constructor() {
    this.verifier = new EmailVerifier('YOUR_API_KEY', {
      checkCatchAll: true,
      checkSMTP: true,
      checkFree: true,
      checkDisposable: true,
    });
  }

  async verifyEmail(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.verifier.verify(email, (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info.success);
        }
      });
    });
  }
}

import { Injectable } from '@nestjs/common';
import * as dns from 'dns';

@Injectable()
export class EmailValidatorService {
  // Check if the email is a professional email
  async isProfessionalEmail(email: string): Promise<boolean> {
    const domain = email.split('@')[1];

    // Check if the domain is a common public domain
    const publicDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];
    if (publicDomains.includes(domain)) {
      return false;
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    // Perform DNS lookup for MX records to check if the domain has mail servers
    try {
      const addresses = await this.resolveMxRecords(domain);
      return addresses.length > 0;
    } catch (error) {
      return false;
    }
  }

  // Check if the email is not professional
  async isNonProfessionalEmail(email: string): Promise<boolean> {
    const isProfessional = await this.isProfessionalEmail(email);
    return !isProfessional;
  }

  // Helper method to resolve MX records
  private resolveMxRecords(domain: string): Promise<dns.MxRecord[]> {
    return new Promise((resolve, reject) => {
      dns.resolve(domain, 'MX', (error, addresses) => {
        if (error) {
          return reject(error);
        }
        resolve(addresses);
      });
    });
  }
}

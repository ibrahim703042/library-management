import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as os from 'os';
import dns from 'dns';
import { nanoid } from 'nanoid';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';

@Injectable()
export class UtilityService {
  // Generates a random code using UUID
  codeGenerate(): string {
    return randomUUID().slice(0, 6);
  }

  // Encodes a password using bcrypt
  encodePassword(password: string): string {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }

  // Generates a unique ID using nanoid
  async generateID(): Promise<string> {
    return new Promise((resolve) => {
      resolve(nanoid(12));
    });
  }

  // Gets the server's IP address
  getServerIp(): string {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      const nets = interfaces[name];
      if (nets) {
        for (const net of nets) {
          if (net.family === 'IPv4' && !net.internal) {
            return net.address;
          }
        }
      }
    }
    return '127.0.0.1';
  }

  // Checks if the server has an internet connection
  hasInternetConnection(): Promise<boolean> {
    return new Promise((resolve) => {
      dns.lookup('google.com', (err) => {
        resolve(!err);
      });
    });
  }

  // validateEmail(email: string): boolean {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // }

  validateEmail(email: string): boolean {
    const allowedDomains = [
      'gmail.com',
      'yahoo.fr',
      'outlook.com',
      'hotmail.com',
    ];
    const emailRegex = /^[^\s@]+@([a-zA-Z0-9.-]+)$/;

    if (!emailRegex.test(email)) {
      return false; // Invalid email format
    }

    // Extract domain from email and check if it's in the allowed list
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
  }

  validatePhoneNumber(phoneNumber: string): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phoneNumber);
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  daysBetweenDates(date1: Date, date2: Date): number {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  isPastDate(date: Date): boolean {
    return date.getTime() < new Date().getTime();
  }

  capitalizeFirstLetter(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  trimAllWhitespace(text: string): string {
    return text.replace(/\s+/g, '');
  }

  isPalindrome(text: string): boolean {
    const cleaned = text.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    return cleaned === cleaned.split('').reverse().join('');
  }

  roundToNearestInteger(value: number): number {
    return Math.round(value);
  }

  formatCurrency(
    value: number,
    locale: string = 'en-US',
    currency: string = 'USD',
  ): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(value);
  }

  generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  findDuplicates<T>(array: T[]): T[] {
    const duplicates = [];
    const uniqueElements = new Set();
    for (const item of array) {
      if (uniqueElements.has(item)) {
        duplicates.push(item);
      } else {
        uniqueElements.add(item);
      }
    }
    return duplicates;
  }

  flattenArray<T>(nestedArray: any[]): T[] {
    return nestedArray.reduce(
      (acc, val) =>
        acc.concat(Array.isArray(val) ? this.flattenArray(val) : val),
      [],
    );
  }

  getRequiredEnvVar(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(
        `Environment variable ${key} is required but not defined.`,
      );
    }
    return value;
  }

  getOptionalEnvVar(key: string, defaultValue: string): string {
    return process.env[key] || defaultValue;
  }

  readFileSync(filePath: string): string {
    return fs.readFileSync(filePath, 'utf8');
  }

  writeFileSync(filePath: string, data: string): void {
    fs.writeFileSync(filePath, data);
  }

  fileOrDirectoryExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }
}

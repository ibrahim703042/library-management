import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingAppService {
  private readonly logger = new Logger(LoggingAppService.name);

  // Define paths for the application and mail log files
  private logFile = path.join(
    process.cwd(),
    'src/helpers/logging/log/application.log',
  );
  private mailFile = path.join(
    process.cwd(),
    'src/helpers/logging/log/mail.log',
  );

  constructor() {
    // Ensure that the log directory exists before creating log files
    this.ensureLogDirectoryExists();
    // Create log files if they do not exist
    this.createLogFile();
  }

  private ensureLogDirectoryExists() {
    // Get the directory path for the log files
    const logDir = path.dirname(this.logFile);

    // Check if the directory exists
    if (!fs.existsSync(logDir)) {
      // Create the directory recursively if it doesn't exist
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  /**
   * Creates the log files if they do not already exist.
   */
  private createLogFile() {
    // Check if the application log file exists
    if (!fs.existsSync(this.logFile)) {
      // Create an empty application log file
      fs.writeFileSync(this.logFile, '');
    }

    // Check if the mail log file exists
    if (!fs.existsSync(this.mailFile)) {
      // Create an empty mail log file
      fs.writeFileSync(this.mailFile, '');
    }
  }

  /**
   * Writes a formatted log message to the application log file.
   * @param level - The level of the log (e.g., 'SUCCESS', 'ERROR').
   * @param message - The message to log.
   */
  private writeToFileApp(level: string, message: string) {
    // Format the log message with a timestamp and log level
    const formattedMessage = `${new Date().toISOString()} [${level}]: ${message}\n`;

    // Append the formatted message to the application log file
    fs.appendFileSync(this.logFile, formattedMessage);
  }

  /**
   * Writes a formatted log message to the mail log file.
   * @param level - The level of the log (e.g., 'SUCCESS', 'ERROR').
   * @param message - The message to log.
   */
  private writeToFileMail(level: string, message: string) {
    // Format the log message with a timestamp and log level
    const formattedMessage = `${new Date().toISOString()} [${level}]: ${message}\n`;

    // Append the formatted message to the mail log file
    fs.appendFileSync(this.mailFile, formattedMessage);
  }

  /**
   * Logs a success message to both the console and the application log file.
   * @param message - The message to log.
   */
  success(message: string) {
    // Log the success message to the console
    this.logger.log(message);

    // Write the success message to the application log file
    this.writeToFileApp('SUCCESS', message);
  }

  /**
   * Logs an error message to both the console and the application log file.
   * @param message - The message to log.
   */
  error(message: string) {
    // Log the error message to the console
    this.logger.error(message);

    // Write the error message to the application log file
    this.writeToFileApp('ERROR', message);
  }

  /**
   * Logs an error message related to mail to both the console and the mail log file.
   * @param message - The message to log.
   */
  errorMail(message: string) {
    // Log the error message to the console with a warning level
    this.logger.warn(message);

    // Write the error message to the mail log file
    this.writeToFileMail('ERROR', message);
  }

  /**
   * Logs a success message related to mail to both the console and the mail log file.
   * @param message - The message to log.
   */
  successMail(message: string) {
    // Log the success message to the console with a warning level
    this.logger.warn(message);

    // Write the success message to the mail log file
    this.writeToFileMail('SUCCESS', message);
  }
}

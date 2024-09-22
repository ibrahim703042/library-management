import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { getServerIp } from 'src/Helpers/appHelper';
import { IpGeolocationService } from 'src/Helpers/services/IpGeolocationService';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(
    private readonly logger: Logger,
    private readonly ipGeolocationService: IpGeolocationService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl: url } = req;
    const reqTime = new Date().getTime();

    // Get the server's IP address
    const serverIp = getServerIp();

    // Get the server's location
    // const geoData = await this.ipGeolocationService.getPublicIpAndLocation();

    res.on('finish', () => {
      const { statusCode } = res;
      const resTime = new Date().getTime();

      this.logger.log(
        `${method} ${url} ${statusCode} - ${resTime - reqTime} ms - Server IP => ${serverIp} `,
      );
      // this.logger.log(
      //   `${method} ${url} ${statusCode} - ${resTime - reqTime} ms \nServer IP => ${serverIp} \nGeoData => \n${geoData} `,
      // );
    });

    next();
  }
}

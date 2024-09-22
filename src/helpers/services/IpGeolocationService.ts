import { Injectable, Logger } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class IpGeolocationService {
  private readonly logger = new Logger(IpGeolocationService.name);

  async getPublicIpAndLocation(): Promise<any> {
    try {
      // Step 1: Get the public IP address
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const publicIp = ipData.ip;

      // Step 2: Get geolocation data based on the IP address
      const response = await fetch(`http://ip-api.com/json/${publicIp}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: IpApiResponse = await response.json();

      // Format the response data for logging
      const geoInfo = [
        `Public IP: ${data.publicIp}`,
        `Continent: ${data.continent}`,
        `Country: ${data.country}`,
        `Country Code: ${data.countryCode}`,
        `Region: ${data.region}`,
        `City: ${data.city}`,
        `Latitude: ${data.lat}`,
        `Longitude: ${data.lon}`,
        `Timezone: ${data.timezone}`,
        `Currency: ${data.currency}`,
        `ISP: ${data.isp}`,
        `Organization: ${data.org}`,
        `AS: ${data.as}`,
        `AS Name: ${data.asname}`,
        `Mobile: ${data.mobile}`,
        `Proxy: ${data.proxy}`,
        `Hosting: ${data.hosting}`,
      ].join('\n');

      return `${geoInfo}`;
      //   return `${data.city}, ${data.region}, ${data.country}`;
    } catch (error) {
      this.logger.error('Failed to fetch location', error);
      return 'Unknown location';
    }
  }
}

export interface IpApiResponse {
  publicIp?: string;
  continent?: string;
  country?: string;
  countryCode?: string;
  region?: string;
  city?: string;
  lat?: number;
  lon?: number;
  timezone?: string;
  currency?: string;
  isp?: string;
  org?: string;
  as?: string;
  asname?: string;
  mobile?: boolean;
  proxy?: boolean;
  hosting?: boolean;
}

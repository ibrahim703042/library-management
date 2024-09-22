/* eslint-disable prettier/prettier */
import { getServerIp } from 'src/Helpers/appHelper';

export default () => {
  const port = process.env.PORT || 9090;
  const ipAddress = getServerIp();

  return {
    address: {
      ip: ipAddress,
    },
    server: {
      port: port,
    },
    swagger: {
      path: process.env.SWAGGER_PATH,
      url: `http://${ipAddress}:${port}`,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    microservice: {
      host: process.env.MICROSERVICE_LIBRARY_HOST || ipAddress,
      port: process.env.MICROSERVICE_LIBRARY_PORT,
    },
    database: {
      connectionString: process.env.MONGODB_URI,
    },
  };
};

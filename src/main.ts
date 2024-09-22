import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { ResponseInterceptor } from './Helpers/interceptors/response/response.interceptor';
import { HttpExceptionFilter } from './Helpers/filter/httpExceptionFilter';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  // Retrieve configuration values
  const local = '127.0.0.1';
  const port = configService.get<number>('server.port', 9001);
  const ipAddress = configService.get<string>('address.ip', local);
  const microHost = configService.get<string>('microservice.host', local);
  const microPort = configService.get<number>('microservice.port', 4001);
  const swaggerPath = configService.get<string>('SWAGGER_PATH', 'api-docs');
  const swaggerUrl = `http://${ipAddress}:${port}/${swaggerPath}`;

  // Configure CORS options
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: '*',
    credentials: true,
  };

  // Global settings
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.setGlobalPrefix('api', {
    exclude: [{ path: `${swaggerPath}(/.*)?`, method: RequestMethod.ALL }],
  });
  app.enableCors(corsOptions);

  // Swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Library Management Service')
    .setDescription('API for managing library operations')
    .setVersion('1.0')
    .addServer(swaggerUrl, 'Local environment')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(swaggerPath, app, document);

  // Mongoose configuration
  mongoose.set('strictPopulate', false);

  // Microservice connection
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { host: microHost, port: microPort },
  });

  await app.startAllMicroservices();

  // Start the main application
  try {
    await app.listen(port, () => {
      logger.log(`Library Management server is running at ${swaggerUrl}`);
      logger.log(`Microservice is running at ${microHost}:${microPort}`);
    });
  } catch (error) {
    logger.error(`Error starting the server: ${error.message}`, error.stack);
    process.exit(1);
  }
}
bootstrap();

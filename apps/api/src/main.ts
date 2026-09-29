import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import {
  VersioningType,
  ValidationPipe,
} from '@nestjs/common';
import helmet from 'helmet';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  // Security
  app.use(helmet());

  // Cookies
  app.use(cookieParser());

  // CORS
  app.enableCors({
    origin: config.get<string>('CORS_ORIGIN'),
    credentials: true,
  });

  // Global API prefix
  const apiPrefix =
    config.get<string>('apiPrefix') || 'api';

  app.setGlobalPrefix(apiPrefix);

  // API Versioning
  const apiVersion =
    config.get<string>('apiVersion') || 'v1';

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: apiVersion,
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('SmartFinds API')
    .setDescription(
      'Affiliate marketing platform — REST API',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );

  SwaggerModule.setup('docs', app, document);

  // Port
  const port =
    config.get<number>('port') ||
    Number(process.env.PORT) ||
    3000;

  await app.listen(process.env.PORT || 4000, '0.0.0.0');

  console.log(
    `SmartFinds API running on port ${port}`,
  );
}

bootstrap();
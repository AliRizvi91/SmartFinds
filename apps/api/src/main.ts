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

let cachedApp: any = null;

export async function createApp() {
  if (cachedApp) {
    return cachedApp;
  }

  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  // Security
  app.use(helmet());

  // Cookies
  app.use(cookieParser());

  // CORS
  app.enableCors({
    origin: config.get('CORS_ORIGIN'),
    credentials: true,
  });

  // API Prefix
  const apiPrefix =
    config.get('apiPrefix') || 'api';

  app.setGlobalPrefix(apiPrefix);

  // API Versioning
  const apiVersion =
    config.get('apiVersion') || 'v1';

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

  // Initialize application
  await app.init();

  cachedApp = app;

  return app;
}

// Local development
async function bootstrap() {
  const app = await createApp();

  const config = app.get(ConfigService);

  const port =
    Number(config.get('port')) ||
    Number(process.env.PORT) ||
    3000;

  await app.listen(port);

  console.log(
    `SmartFinds API running on port ${port}`,
  );
}

// Don't start a local server on Vercel
if (process.env.VERCEL !== '1') {
  bootstrap();
}

// Vercel Serverless Handler
export default async function handler(
  req: any,
  res: any,
) {
  const app = await createApp();

  const httpAdapter = app.getHttpAdapter();
  const instance = httpAdapter.getInstance();

  return instance(req, res);
}
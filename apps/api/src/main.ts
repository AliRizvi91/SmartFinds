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

export async function createApp() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.use(helmet());
  app.use(cookieParser());

  app.enableCors({
    origin: config.get<string>('CORS_ORIGIN'),
    credentials: true,
  });

  const apiPrefix =
    config.get<string>('apiPrefix') || 'api';

  app.setGlobalPrefix(apiPrefix);

  const apiVersion =
    config.get<string>('apiVersion') || 'v1';

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: apiVersion,
  });

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

  await app.init();

  return app;
}

async function bootstrap() {
  const app = await createApp();

  const config = app.get(ConfigService);
  const port = config.get<number>('port') || 4000;

  await app.listen(port);

  console.log(
    `SmartFinds API running on http://localhost:${port}`,
  );
}

if (process.env.VERCEL !== '1') {
  bootstrap();
}

export default async function handler(
  req: any,
  res: any,
) {
  const app = await createApp();

  const httpAdapter = app.getHttpAdapter();
  const instance = httpAdapter.getInstance();

  return instance(req, res);
}
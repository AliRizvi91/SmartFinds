import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';
import { plainToInstance } from 'class-transformer';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV!: Environment;

  @IsNumber()
  PORT!: number;

  @IsString()
  DATABASE_URL!: string;

  @IsString()
  JWT_SECRET!: string;

  @IsString()
  JWT_REFRESH_SECRET!: string;

  @IsOptional()
  @IsString()
  CORS_ORIGIN?: string;

  // Cloudinary
  @IsString()
  CLOUDINARY_CLOUD_NAME!: string;

  @IsString()
  CLOUDINARY_API_KEY!: string;

  @IsString()
  CLOUDINARY_API_SECRET!: string;
}

export function validate(config: Record<string, unknown>) {
  const validated = plainToInstance(
    EnvironmentVariables,
    config,
    {
      enableImplicitConversion: true,
    },
  );

  const errors = validateSync(validated, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(
      `Invalid environment configuration:\n${errors
        .map((e) =>
          Object.values(
            e.constraints ?? {},
          ).join(', '),
        )
        .join('\n')}`,
    );
  }

  return validated;
}
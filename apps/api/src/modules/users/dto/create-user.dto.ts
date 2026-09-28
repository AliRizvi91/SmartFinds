import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

import { UserRole } from '@smartfinds/types';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  passwordHash!: string;

  @IsEnum(UserRole)
  role!: UserRole;

  @IsOptional()
  @IsString()
  avatarUrl?: string;
}
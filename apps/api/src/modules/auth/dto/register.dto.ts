import {
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { UserRole } from '@smartfinds/types';

export class RegisterDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password!: string;

  @IsEnum(UserRole)
  role!: UserRole;
}
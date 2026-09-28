import { IsEmail } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class ResendLoginOtpDto {
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    example: 'reset-token-here',
  })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    example: 'NewStrongPassword123!',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}
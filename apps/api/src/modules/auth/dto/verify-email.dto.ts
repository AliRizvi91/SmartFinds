import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class VerifyLoginOtpDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 6)
  otp: string;
}

export class VerifyEmailDto {
  @ApiProperty({
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Email verification OTP',
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  otp: string;
}
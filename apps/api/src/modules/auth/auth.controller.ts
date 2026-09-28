import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import type { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResendLoginOtpDto, ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyLoginOtpDto, VerifyEmailDto } from './dto/verify-email.dto';

import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    return this.usersService.findAll();
  }

  // =========================================================
  // GET CURRENT USER
  // GET /api/v1/auth/me
  // =========================================================

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(
    @CurrentUser('sub') userId: string,
  ) {
    return this.usersService.findById(userId);
  }

  // =========================================================
  // REGISTER
  // POST /api/v1/auth/register
  // =========================================================

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('avatarUrl'),
  )
  async register(
    @Body() dto: RegisterDto,

    @UploadedFile()
    avatarUrl:
      | {
        buffer: Buffer;
      }
      | undefined,

    @Res({ passthrough: true })
    res: Response,
  ) {
    const result =
      await this.authService.register(
        dto,
        avatarUrl,
      );

    this.setAuthCookies(
      res,
      result.accessToken,
      result.refreshToken,
    );

    return {
      user: result.user,
    };
  }

  // =========================================================
  // LOGIN
  // POST /api/v1/auth/login
  // =========================================================

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({
    default: {
      limit: 10,
      ttl: 60_000,
    },
  })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('login/verify-otp')
  @HttpCode(HttpStatus.OK)
  async verifyLoginOtp(
    @Body() dto: VerifyLoginOtpDto,

    @Res({ passthrough: true })
    res: Response,
  ) {
    const result =
      await this.authService.verifyLoginOtp(
        dto.email,
        dto.otp,
      );

    this.setAuthCookies(
      res,
      result.accessToken,
      result.refreshToken,
    );

    return {
      user: result.user,
      message: 'Login successful',
    };
  }

  @Post('login/resend-otp')
  @HttpCode(HttpStatus.OK)
  async resendLoginOtp(
    @Body() dto: ResendLoginOtpDto,
  ) {
    return this.authService.resendLoginOtp(
      dto.email,
    );
  }

  // =========================================================
  // REFRESH
  // POST /api/v1/auth/refresh
  // =========================================================

  @Post('refresh')
  async refresh(
    @Req()
    req: Request & {
      user?: {
        sub: string;
        refreshToken: string;
      };
    },
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!req.user?.sub || !req.user?.refreshToken) {
      throw new UnauthorizedException();
    }

    const userId = req.user.sub;
    const refreshToken = req.user.refreshToken;

    const result = await this.authService.refresh(
      userId,
      refreshToken,
    );

    this.setAccessTokenCookie(
      res,
      result.accessToken,
    );

    return {
      user: result.user,
    };
  }

  // =========================================================
  // LOGOUT
  // POST /api/v1/auth/logout
  // =========================================================

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req()
    req: Request & {
      user: {
        sub: string;
        role?: string;
        email?: string;
      };
    },
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.logout(
      req.user.sub,
    );

    this.clearAuthCookies(res);

    return result;
  }

  // =========================================================
  // FORGOT PASSWORD
  // POST /api/v1/auth/forgot-password
  // =========================================================

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(
    @Body() dto: ForgotPasswordDto,
  ) {
    return this.authService.forgotPassword(
      dto.email,
    );
  }

  // =========================================================
  // RESET PASSWORD
  // POST /api/v1/auth/reset-password
  // =========================================================

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Body() dto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(
      dto.token,
      dto.newPassword,
    );
  }

  // =========================================================
  // VERIFY EMAIL
  // POST /api/v1/auth/verify-email
  // =========================================================
  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  async verifyEmail(
    @Body() dto: VerifyEmailDto,
  ) {
    return this.authService.verifyEmail(
      dto.email,
      dto.otp,
    );
  }

  // =========================================================
  // RESEND EMAIL VERIFICATION CODE
  // POST /api/v1/auth/verify-email/resend
  // =========================================================
  @Post('verify-email/resend')
  @HttpCode(HttpStatus.OK)
  async resendEmailVerification(
    @Body() dto: ForgotPasswordDto,
  ) {
    return this.authService.resendEmailVerificationOtp(
      dto.email,
    );
  }

  // =========================================================
  // COOKIE OPTIONS
  // =========================================================

  private getCookieOptions(): {
    httpOnly: boolean;
    secure: boolean;
    sameSite: 'none' | 'lax';
    path: string;
  } {
    const isProduction =
      process.env.NODE_ENV === 'production';

    return {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction
        ? 'none'
        : 'lax',
      path: '/',
    };
  }

  // =========================================================
  // SET ACCESS + REFRESH COOKIES
  // =========================================================

  private setAuthCookies(
    res: Response,
    accessToken: string,
    refreshToken: string,
  ) {
    const options =
      this.getCookieOptions();

    res.cookie(
      'accessToken',
      accessToken,
      {
        ...options,
        maxAge: 15 * 60 * 1000,
      },
    );

    res.cookie(
      'refreshToken',
      refreshToken,
      {
        ...options,
        maxAge:
          7 * 24 * 60 * 60 * 1000,
      },
    );
  }

  // =========================================================
  // SET ACCESS TOKEN COOKIE
  // =========================================================

  private setAccessTokenCookie(
    res: Response,
    accessToken: string,
  ) {
    const options =
      this.getCookieOptions();

    res.cookie(
      'accessToken',
      accessToken,
      {
        ...options,
        maxAge: 15 * 60 * 1000,
      },
    );
  }

  // =========================================================
  // CLEAR AUTH COOKIES
  // =========================================================

  private clearAuthCookies(
    res: Response,
  ) {
    const options =
      this.getCookieOptions();

    res.clearCookie(
      'accessToken',
      options,
    );

    res.clearCookie(
      'refreshToken',
      options,
    );
  }
}
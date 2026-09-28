import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { randomInt } from 'crypto';


import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { LoginDto } from './dto/login.dto';


import * as bcrypt from 'bcryptjs';

import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

import { UserRole } from '@smartfinds/types';
import { MailService } from '../mail/mail.service';

const SALT_ROUNDS = 12;

export interface UploadedavatarUrl {
  buffer: Buffer;
}

export interface UserSummary {
  _id: unknown;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResult {
  user: UserSummary;
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly MailService: MailService,
  ) { }

  private generateOtp(): string {
    return randomInt(
      100000,
      1000000,
    ).toString();
  }



  async register(
    dto: RegisterDto,
    uploadAvatar?: UploadedavatarUrl,
  ): Promise<AuthResult> {
    try {
      // ---------------------------------------
      // 1. Normalize input
      // ---------------------------------------

      const name = dto.name.trim();
      const email = dto.email.trim().toLowerCase();

      // ---------------------------------------
      // 2. Check existing user
      // ---------------------------------------

      const existingUser =
        await this.usersService.findByEmail(email);

      if (existingUser) {
        throw new ConflictException(
          'An account with this email already exists',
        );
      }

      // ---------------------------------------
      // 3. Hash password
      // ---------------------------------------

      const passwordHash = await bcrypt.hash(
        dto.password,
        SALT_ROUNDS,
      );

      // ---------------------------------------
      // 4. Upload avatar
      // ---------------------------------------

      let avatarUrl: string | undefined;

      if (uploadAvatar?.buffer?.length) {
        try {
          const uploadResult =
            await this.cloudinaryService.uploadBuffer(
              uploadAvatar.buffer,
              'assets/users',
            );

          avatarUrl = uploadResult.secure_url;
        } catch (error) {
          console.error(
            'Cloudinary upload error:',
            error,
          );

          throw new BadRequestException(
            'Failed to upload avatar. Please try again.',
          );
        }
      }

      // ---------------------------------------
      // 5. Create user
      // ---------------------------------------

      const user =
        await this.usersService.create({
          name,
          email,
          passwordHash,
          role: dto.role,
          avatarUrl,
        });

      // ---------------------------------------
      // 5b. Send an email-verification code
      // ---------------------------------------
      // Best-effort: registration should still succeed even if the
      // verification email fails to send (user can request a resend later).

      try {
        const verificationOtp = this.generateOtp();
        const verificationOtpHash = await bcrypt.hash(
          verificationOtp,
          SALT_ROUNDS,
        );
        const verificationExpiresMinutes = Number(
          this.configService.get<string>(
            'LOGIN_OTP_EXPIRES_MINUTES',
            '10',
          ),
        );

        await this.usersService.updateEmailVerificationOtp(
          user._id.toString(),
          {
            emailVerificationOtpHash: verificationOtpHash,
            emailVerificationOtpExpires: new Date(
              Date.now() + verificationExpiresMinutes * 60 * 1000,
            ),
            emailVerificationOtpLastSentAt: new Date(),
          },
        );

        await this.MailService.sendEmailVerificationOtp(
          email,
          verificationOtp,
        );
      } catch (verificationError) {
        console.error(
          'Failed to send verification email:',
          verificationError,
        );
      }

      // ---------------------------------------
      // 6. Generate auth result
      // ---------------------------------------
      // This creates:
      // - access token
      // - refresh token
      // - refresh token hash in MongoDB

      return this.buildAuthResult(user);

    } catch (error) {
      // Re-throw known HTTP exceptions
      if (error instanceof HttpException) {
        throw error;
      }

      console.error(
        'Register error:',
        error,
      );

      throw new InternalServerErrorException(
        'Registration failed. Please try again.',
      );
    }
  }

  // =========================================================
  // LOGIN
  // =========================================================

  /**
   * POST /api/v1/auth/login
   */
  async login(
    dto: LoginDto,
  ): Promise<{
    requiresOtp: boolean;
    email: string;
    message: string;
  }> {
    try {
      // ---------------------------------------
      // 1. Normalize input
      // ---------------------------------------

      const email = dto.email.trim().toLowerCase();

      // ---------------------------------------
      // 2. Find user
      // ---------------------------------------

      const user =
        await this.usersService.findByEmail(email);

      if (!user) {
        throw new UnauthorizedException(
          'Invalid email or password',
        );
      }

      // ---------------------------------------
      // 3. Check password hash
      // ---------------------------------------

      if (!user.passwordHash) {
        throw new UnauthorizedException(
          'Invalid email or password',
        );
      }

      // ---------------------------------------
      // 4. Compare password
      // ---------------------------------------

      const passwordMatches = await bcrypt.compare(
        dto.password,
        user.passwordHash,
      );

      if (!passwordMatches) {
        throw new UnauthorizedException(
          'Invalid email or password',
        );
      }

      // ---------------------------------------
      // 5. Check account status
      // ---------------------------------------

      if (!user.isActive) {
        throw new UnauthorizedException(
          'This account has been deactivated',
        );
      }

      // ---------------------------------------
      // 6. Generate Login OTP
      // ---------------------------------------

      const otp = this.generateOtp();

      // ---------------------------------------
      // 7. Hash OTP
      // ---------------------------------------

      const otpHash = await bcrypt.hash(
        otp,
        SALT_ROUNDS,
      );

      // ---------------------------------------
      // 8. Calculate OTP expiry
      // ---------------------------------------

      const expiresMinutes = Number(
        this.configService.get<string>(
          'LOGIN_OTP_EXPIRES_MINUTES',
          '10',
        ),
      );

      const expiresAt = new Date(
        Date.now() +
        expiresMinutes * 60 * 1000,
      );

      // ---------------------------------------
      // 9. Save OTP in database
      // ---------------------------------------


      await this.usersService.update(
        user._id.toString(),
        {
          loginOtpHash: otpHash,
          loginOtpExpires: expiresAt,
          loginOtpLastSentAt: new Date(),
        },
      );

      // ---------------------------------------
      // 10. Send OTP email
      // ---------------------------------------

      await this.MailService.sendLoginOtp(
        email,
        otp,
      );

      // ---------------------------------------
      // 11. Return OTP required
      // ---------------------------------------

      return {
        requiresOtp: true,
        email,
        message:
          'A verification code has been sent to your email.',
      };
    } catch (error) {
      // Re-throw known HTTP exceptions
      if (error instanceof HttpException) {
        throw error;
      }

      console.error(
        'Login error:',
        error,
      );

      throw new InternalServerErrorException(
        'Login failed. Please try again.',
      );
    }
  }


  async verifyLoginOtp(
    email: string,
    otp: string,
  ): Promise<AuthResult> {
    const normalizedEmail =
      email.trim().toLowerCase();

    const user =
      await this.usersService.findByEmail(
        normalizedEmail,
      );

    if (!user) {
      throw new UnauthorizedException(
        'Invalid verification code',
      );
    }

    if (!user.loginOtpHash) {
      throw new UnauthorizedException(
        'No active verification code. Please request a new code.',
      );
    }

    if (
      !user.loginOtpExpires ||
      new Date(user.loginOtpExpires).getTime() <
      Date.now()
    ) {
      throw new UnauthorizedException(
        'Verification code has expired. Please request a new code.',
      );
    }

    const otpMatches =
      await bcrypt.compare(
        otp,
        user.loginOtpHash,
      );

    if (!otpMatches) {
      throw new UnauthorizedException(
        'Invalid verification code. Please try again.',
      );
    }

    // Clear OTP
    await this.usersService.update(
      user._id.toString(),
      {
        loginOtpHash: null,
        loginOtpExpires: null,
        loginOtpLastSentAt: null,
      },
    );

    // NOW create actual session
    return this.buildAuthResult(user);
  }

  async resendLoginOtp(
    email: string,
  ): Promise<{
    message: string;
  }> {
    const normalizedEmail =
      email.trim().toLowerCase();

    const user =
      await this.usersService.findByEmail(
        normalizedEmail,
      );

    if (!user) {
      throw new UnauthorizedException(
        'Unable to resend verification code',
      );
    }

    if (!user.isActive) {
      throw new UnauthorizedException(
        'This account has been deactivated',
      );
    }

    const resendSeconds = Number(
      this.configService.get<string>(
        'LOGIN_OTP_RESEND_SECONDS',
        '60',
      ),
    );

    if (user.loginOtpLastSentAt) {
      const elapsed =
        Date.now() -
        new Date(
          user.loginOtpLastSentAt,
        ).getTime();

      if (
        elapsed <
        resendSeconds * 1000
      ) {
        const remainingSeconds =
          Math.ceil(
            (resendSeconds * 1000 -
              elapsed) /
            1000,
          );

        throw new BadRequestException(
          `Please wait ${remainingSeconds} seconds before requesting another code.`,
        );
      }
    }

    const otp = this.generateOtp();

    const otpHash =
      await bcrypt.hash(
        otp,
        SALT_ROUNDS,
      );

    const expiresMinutes = Number(
      this.configService.get<string>(
        'LOGIN_OTP_EXPIRES_MINUTES',
        '10',
      ),
    );

    const expiresAt = new Date(
      Date.now() +
      expiresMinutes * 60 * 1000,
    );

    await this.usersService.update(
      user._id.toString(),
      {
        loginOtpHash: otpHash,
        loginOtpExpires: expiresAt,
        loginOtpLastSentAt: new Date(),
      },
    );

    await this.MailService.sendLoginOtp(
      normalizedEmail,
      otp,
    );

    return {
      message:
        'A new verification code has been sent to your email.',
    };
  }

  // =========================================================
  // REFRESH
  // =========================================================

  /**
   * POST /api/v1/auth/refresh
   *
   * Refresh token is supplied by JwtRefreshStrategy
   * from the HTTP-only cookie.
   *
   * Only a new access token is generated.
   * The refresh token remains the same and expires
   * after its original 7-day lifetime.
   */
  async refresh(
    userId: string,
    presentedRefreshToken: string,
  ): Promise<{
    user: UserSummary;
    accessToken: string;
  }> {
    if (!presentedRefreshToken) {
      throw new UnauthorizedException(
        'Refresh token is required',
      );
    }

    const user =
      await this.usersService.findById(userId);

    if (!user.isActive) {
      throw new UnauthorizedException(
        'This account has been deactivated',
      );
    }

    /**
     * Load refreshTokenHash.
     */
    const authUser =
      await this.usersService.findByEmail(
        user.email,
      );

    if (!authUser?.refreshTokenHash) {
      throw new UnauthorizedException(
        'Session expired, please log in again',
      );
    }

    /**
     * Compare presented token against
     * hashed token stored in MongoDB.
     */
    const matches =
      await bcrypt.compare(
        presentedRefreshToken,
        authUser.refreshTokenHash,
      );

    if (!matches) {
      throw new UnauthorizedException(
        'Session expired, please log in again',
      );
    }

    /**
     * Verify refresh JWT expiration.
     */
    try {
      const payload =
        this.jwtService.verify<{
          sub: string;
          role: string;
          email: string;
          type?: string;
        }>(
          presentedRefreshToken,
          {
            secret:
              this.configService.get<string>(
                'jwt.refreshSecret',
              ),
          },
        );


      /**
       * Make sure this refresh token belongs
       * to the same user.
       */
      if (payload.sub !== userId) {
        throw new UnauthorizedException(
          'Invalid refresh token',
        );
      }

      /**
       * Prevent access token being used as
       * refresh token.
       */
      if (
        payload.type &&
        payload.type !== 'refresh'
      ) {
        throw new UnauthorizedException(
          'Invalid refresh token',
        );
      }
    } catch (error) {
      if (
        error instanceof UnauthorizedException
      ) {
        throw error;
      }

      await this.usersService.setRefreshTokenHash(
        userId,
        null,
      );

      throw new UnauthorizedException(
        'Session expired, please log in again',
      );
    }

    /**
     * Generate only a new access token.
     */
    const accessToken =
      this.createAccessToken(user);

    return {
      user: this.getSafeUser(user),
      accessToken,
    };
  }

  // =========================================================
  // LOGOUT
  // =========================================================

  /**
   * POST /api/v1/auth/logout
   *
   * Database session is invalidated here.
   * Controller clears browser cookies.
   */
  async logout(
    userId: string,
  ) {
    await this.usersService.setRefreshTokenHash(
      userId,
      null,
    );

    return {
      __message: 'Logged out',
    };
  }


  // =========================================================
  // FORGOT PASSWORD
  // =========================================================

  async forgotPassword(email: string) {
    const normalizedEmail = email
      .trim()
      .toLowerCase();

    const user =
      await this.usersService.findByEmail(
        normalizedEmail,
      );

    // Security: same response whether email exists or not
    if (!user) {
      return {
        message:
          'If that email exists, a reset link has been sent.',
      };
    }

    // Generate raw token
    const resetToken =
      randomBytes(32).toString('hex');

    // Store only hashed token in DB
    const resetTokenHash =
      await bcrypt.hash(
        resetToken,
        SALT_ROUNDS,
      );

    const resetExpires =
      new Date(
        Date.now() + 60 * 60 * 1000,
      );

    await this.usersService.update(
      user._id.toString(),
      {
        passwordResetToken: resetTokenHash,
        passwordResetExpires: resetExpires,
      } as any,
    );

    // Frontend reset URL
    const frontendUrl =
      this.configService.getOrThrow<string>(
        'FRONTEND_URL',
      );

    const resetUrl =
      `${frontendUrl}/reset-password?token=${resetToken}`;

    await this.MailService.sendPasswordResetEmail(
      normalizedEmail,
      resetUrl,
    );

    return {
      message:
        'If that email exists, a reset link has been sent.',
    };
  }

  // =========================================================
  // RESET PASSWORD
  // =========================================================

  async resetPassword(
    token: string,
    newPassword: string,
  ) {
    if (newPassword.length < 8) {
      throw new BadRequestException(
        'Password must be at least 8 characters.',
      );
    }

    const users =
      await this.usersService.findUsersWithPasswordResetToken();

    let matchedUser: any = null;

    for (const user of users) {
      if (
        !user.passwordResetToken ||
        !user.passwordResetExpires
      ) {
        continue;
      }

      if (
        user.passwordResetExpires.getTime() <
        Date.now()
      ) {
        continue;
      }

      const tokenMatches =
        await bcrypt.compare(
          token,
          user.passwordResetToken,
        );

      if (tokenMatches) {
        matchedUser = user;
        break;
      }
    }

    if (!matchedUser) {
      throw new BadRequestException(
        'Invalid or expired reset token.',
      );
    }

    const passwordHash =
      await bcrypt.hash(
        newPassword,
        SALT_ROUNDS,
      );

    await this.usersService.update(
      matchedUser._id.toString(),
      {
        passwordHash,

        passwordResetToken: null,

        passwordResetExpires: null,

        // Force old sessions to become invalid
        refreshTokenHash: null,
      } as any,
    );

    return {
      message:
        'Password has been reset successfully.',
    };
  }
  // =========================================================
  // VERIFY EMAIL
  // =========================================================

  /**
   * POST /api/v1/auth/verify-email
   *
   * Verifies the OTP sent to the user's inbox at registration time
   * and marks the account's email as verified.
   */
  async verifyEmail(
    email: string,
    otp: string,
  ) {
    const normalizedEmail = email.trim().toLowerCase();

    const user =
      await this.usersService.findByEmail(normalizedEmail);

    if (!user) {
      throw new UnauthorizedException(
        'Invalid verification code',
      );
    }

    if (user.isEmailVerified) {
      return {
        user: this.getSafeUser(user),
      };
    }

    if (!user.emailVerificationOtpHash) {
      throw new UnauthorizedException(
        'No active verification code. Please request a new code.',
      );
    }

    if (
      !user.emailVerificationOtpExpires ||
      new Date(user.emailVerificationOtpExpires).getTime() < Date.now()
    ) {
      throw new UnauthorizedException(
        'Verification code has expired. Please request a new code.',
      );
    }

    const otpMatches = await bcrypt.compare(
      otp,
      user.emailVerificationOtpHash,
    );

    if (!otpMatches) {
      throw new UnauthorizedException(
        'Invalid verification code. Please try again.',
      );
    }

    const updatedUser =
      await this.usersService.updateEmailVerificationOtp(
        user._id.toString(),
        {
          isEmailVerified: true,
          emailVerificationOtpHash: null,
          emailVerificationOtpExpires: null,
          emailVerificationOtpLastSentAt: null,
        },
      );

    return {
      user: this.getSafeUser(updatedUser ?? user),
    };
  }

  /**
   * POST /api/v1/auth/verify-email/resend
   */
  async resendEmailVerificationOtp(email: string) {
    const normalizedEmail = email.trim().toLowerCase();

    const user =
      await this.usersService.findByEmail(normalizedEmail);

    if (!user) {
      // Same response whether the account exists or not.
      return {
        message: 'If that account exists, a new code has been sent.',
      };
    }

    if (user.isEmailVerified) {
      return {
        message: 'This email is already verified.',
      };
    }

    const resendSeconds = Number(
      this.configService.get<string>(
        'LOGIN_OTP_RESEND_SECONDS',
        '60',
      ),
    );

    if (user.emailVerificationOtpLastSentAt) {
      const elapsed =
        Date.now() -
        new Date(user.emailVerificationOtpLastSentAt).getTime();

      if (elapsed < resendSeconds * 1000) {
        const remainingSeconds = Math.ceil(
          (resendSeconds * 1000 - elapsed) / 1000,
        );

        throw new BadRequestException(
          `Please wait ${remainingSeconds} seconds before requesting another code.`,
        );
      }
    }

    const otp = this.generateOtp();
    const otpHash = await bcrypt.hash(otp, SALT_ROUNDS);

    const expiresMinutes = Number(
      this.configService.get<string>(
        'LOGIN_OTP_EXPIRES_MINUTES',
        '10',
      ),
    );

    await this.usersService.updateEmailVerificationOtp(
      user._id.toString(),
      {
        emailVerificationOtpHash: otpHash,
        emailVerificationOtpExpires: new Date(
          Date.now() + expiresMinutes * 60 * 1000,
        ),
        emailVerificationOtpLastSentAt: new Date(),
      },
    );

    await this.MailService.sendEmailVerificationOtp(
      normalizedEmail,
      otp,
    );

    return {
      message: 'A new verification code has been sent to your email.',
    };
  }

  // =========================================================
  // BUILD AUTH RESULT
  // =========================================================

  /**
   * Creates access + refresh tokens.
   *
   * Used after register and login.
   */
  private async buildAuthResult(
    user: any,
  ): Promise<AuthResult> {
    const accessToken =
      this.createAccessToken(user);

    const refreshToken =
      this.createRefreshToken(user);

    const refreshTokenHash =
      await bcrypt.hash(
        refreshToken,
        SALT_ROUNDS,
      );

    await this.usersService.setRefreshTokenHash(
      user._id.toString(),
      refreshTokenHash,
    );

    return {
      user: this.getSafeUser(user),
      accessToken,
      refreshToken,
    };
  }

  // =========================================================
  // ACCESS TOKEN
  // =========================================================

  private createAccessToken(
    user: any,
  ): string {
    const payload = {
      sub: user._id.toString(),
      role: user.role,
      email: user.email,
      type: 'access',
    };

    const expiresIn =
      this.configService.get<string>(
        'jwt.accessExpiresIn',
      );

    return this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow<string>(
        'jwt.accessSecret',
      ),
      expiresIn: expiresIn as `${number}${'s' | 'm' | 'h' | 'd'}`,
    });
    
  }

  // =========================================================
  // REFRESH TOKEN
  // =========================================================

  private createRefreshToken(
    user: any,
  ): string {
    const payload = {
      sub: user._id.toString(),
      role: user.role,
      email: user.email,
      type: 'refresh',
    };

    return this.jwtService.sign(
      payload,
      {
        secret:
          this.configService.get<string>(
            'jwt.refreshSecret',
          ),

        expiresIn:
          this.configService.get(
            'jwt.refreshExpiresIn',
          ),
      },
    );
  }



  // =========================================================
  // SAFE USER
  // =========================================================

  /**
   * Never return sensitive authentication fields.
   */
  private getSafeUser(
    user: any,
  ) {
    const rawUser =
      typeof user?.toObject === 'function'
        ? user.toObject()
        : user;

    const {
      passwordHash,
      refreshTokenHash,
      passwordResetToken,
      passwordResetExpires,
      emailVerificationToken,
      ...safeUser
    } = rawUser;

    void passwordHash;
    void refreshTokenHash;
    void passwordResetToken;
    void passwordResetExpires;
    void emailVerificationToken;

    return safeUser;
  }
}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../users/users.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { MailModule } from '../mail/mail.module';
@Module({
  imports: [
    ConfigModule,

    PassportModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (config: ConfigService) => ({
        secret:
          config.getOrThrow<string>(
            'jwt.accessSecret',
          ),

        signOptions: {
          expiresIn:
            config.get<string>(
              'jwt.accessExpiresIn',
              '15m',
            ),
        },
      }),
    }),

    UsersModule,
    CloudinaryModule,
    MailModule, // ✅ ADD
  ],

  controllers: [
    AuthController,
  ],

  providers: [
    AuthService,
    JwtStrategy,
    JwtRefreshStrategy,
  ],

  exports: [
    AuthService,
  ],
})
export class AuthModule {}
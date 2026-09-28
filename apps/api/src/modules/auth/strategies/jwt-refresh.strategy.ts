import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import {
  PassportStrategy,
} from '@nestjs/passport';

import {
  Strategy,
} from 'passport-jwt';

import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: (
        req: Request & {
          cookies?: Record<string, string>;
        },
      ) =>
        req?.cookies?.refreshToken ?? null,

      ignoreExpiration: false,

      secretOrKey:
        configService.get<string>(
          'jwt.refreshSecret',
        ),

      passReqToCallback: true,
    });
  }

  async validate(
    req: Request & {
      cookies?: Record<string, string>;
    },
    payload: {
      sub: string;
      role: string;
      email: string;
      type?: string;
    },
  ) {
    const refreshToken =
      req.cookies?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException(
        'Refresh token is required',
      );
    }

    if (
      payload.type &&
      payload.type !== 'refresh'
    ) {
      throw new UnauthorizedException(
        'Invalid refresh token',
      );
    }

    return {
      sub: payload.sub,
      role: payload.role,
      email: payload.email,
      refreshToken,
    };
  }
}

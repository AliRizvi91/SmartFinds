import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import {
  PassportStrategy,
} from '@nestjs/passport';

import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';

import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
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
        req?.cookies?.accessToken ??
        ExtractJwt.fromAuthHeaderAsBearerToken()(
          req,
        ),

      ignoreExpiration: false,

      secretOrKey:
        configService.get<string>(
          'jwt.accessSecret',
        ),
    });
  }

  async validate(
    payload: {
      sub: string;
      role: string;
      email: string;
      type?: string;
    },
  ) {
    if (
      payload.type &&
      payload.type !== 'access'
    ) {
      throw new UnauthorizedException(
        'Invalid access token',
      );
    }

    return {
      sub: payload.sub,
      role: payload.role,
      email: payload.email,
    };
  }
}

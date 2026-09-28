import type { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: {
        sub: string;
        role?: string;
        email?: string;
        refreshToken?: string;
        type?: string;
      };
    }
  }
}

export {};

export {};
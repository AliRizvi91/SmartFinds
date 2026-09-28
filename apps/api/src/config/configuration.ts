export default () => ({
  env: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '4000', 10),
  apiPrefix: process.env.API_PREFIX ?? 'api',
  apiVersion: process.env.API_VERSION ?? 'v1',
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
  database: {
    url: process.env.DATABASE_URL ?? 'mongodb://localhost:27017/smartfinds',
  },
  jwt: {
    accessSecret: process.env.JWT_SECRET,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  email: {
    provider: process.env.EMAIL_PROVIDER ?? 'resend',
    apiKey: process.env.EMAIL_API_KEY,
    from: process.env.EMAIL_FROM ?? 'smartfinds <no-reply@smartfinds.io>',
  },
  rateLimit: {
    ttl: parseInt(process.env.RATE_LIMIT_TTL ?? '60', 10),
    max: parseInt(process.env.RATE_LIMIT_MAX ?? '100', 10),
  },
});

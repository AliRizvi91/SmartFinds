import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import {
  APP_FILTER,
  APP_GUARD,
  APP_INTERCEPTOR,
} from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

import configuration from './config/configuration';
import { validate } from './config/env.validation';

import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AdvertisersModule } from './modules/advertisers/advertisers.module';
import { PublishersModule } from './modules/publishers/publishers.module';
import { AffiliateProgramsModule } from './modules/affiliate-programs/affiliate-programs.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { AffiliateApplicationsModule } from './modules/applications/applications.module';
import { TrackingLinksModule } from './modules/tracking-links/tracking-links.module';
import { ClicksModule } from './modules/clicks/clicks.module';
import { ConversionsModule } from './modules/conversions/conversions.module';
import { CommissionsModule } from './modules/commissions/commissions.module';
import { PayoutsModule } from './modules/payouts/payouts.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { MarketingAssetsModule } from './modules/marketing-assets/marketing-assets.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { AdminModule } from './modules/admin/admin.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { HealthModule } from './modules/health/health.module';
import { MailModule } from './modules/mail/mail.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { GuideModule } from './modules/guide/guide.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/api/.env', '.env'],
      load: [configuration],
      validate,
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('database.url'),
      }),
    }),

    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get<number>('rateLimit.ttl') as number,
          limit: config.get<number>('rateLimit.max') as number,
        },
      ],
    }),

    HealthModule,
    CloudinaryModule,
    AuthModule,
    UsersModule,
    AdvertisersModule,
    PublishersModule,
    AffiliateProgramsModule,
    CampaignsModule,
    AffiliateApplicationsModule,
    TrackingLinksModule,
    ClicksModule,
    ConversionsModule,
    CommissionsModule,
    PayoutsModule,
    TransactionsModule,
    MarketingAssetsModule,
    NotificationsModule,
    AnalyticsModule,
    AdminModule,
    MailModule,
    ContactsModule,
    GuideModule,
  ],

  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}

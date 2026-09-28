import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AffiliateApplication, AffiliateApplicationSchema } from './schemas/affiliate-application.schema';
import { AffiliateApplicationsService } from './applications.service';
import { AffiliateApplicationsController } from './applications.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: AffiliateApplication.name, schema: AffiliateApplicationSchema }])],
  controllers: [AffiliateApplicationsController],
  providers: [AffiliateApplicationsService],
  exports: [AffiliateApplicationsService],
})
export class AffiliateApplicationsModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Click, ClickSchema } from '../clicks/schemas/click.schema';
import { Conversion, ConversionSchema } from '../conversions/schemas/conversion.schema';
import { Commission, CommissionSchema } from '../commissions/schemas/commission.schema';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Click.name, schema: ClickSchema },
      { name: Conversion.name, schema: ConversionSchema },
      { name: Commission.name, schema: CommissionSchema },
    ]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}

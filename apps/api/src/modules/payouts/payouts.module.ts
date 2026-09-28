import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Payout, PayoutSchema } from './schemas/payout.schema';
import { PayoutsService } from './payouts.service';
import { PayoutsController } from './payouts.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Payout.name, schema: PayoutSchema }])],
  controllers: [PayoutsController],
  providers: [PayoutsService],
  exports: [PayoutsService],
})
export class PayoutsModule {}

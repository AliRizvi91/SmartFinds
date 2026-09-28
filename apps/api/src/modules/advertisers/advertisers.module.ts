import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Advertiser, AdvertiserSchema } from './schemas/advertiser.schema';
import { AdvertisersService } from './advertisers.service';
import { AdvertisersController } from './advertisers.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Advertiser.name, schema: AdvertiserSchema }])],
  controllers: [AdvertisersController],
  providers: [AdvertisersService],
  exports: [AdvertisersService],
})
export class AdvertisersModule {}

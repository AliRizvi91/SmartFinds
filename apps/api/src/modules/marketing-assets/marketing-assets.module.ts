import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketingAsset, MarketingAssetSchema } from './schemas/marketing-asset.schema';
import { MarketingAssetsService } from './marketing-assets.service';
import { MarketingAssetsController } from './marketing-assets.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: MarketingAsset.name, schema: MarketingAssetSchema }])],
  controllers: [MarketingAssetsController],
  providers: [MarketingAssetsService],
  exports: [MarketingAssetsService],
})
export class MarketingAssetsModule {}

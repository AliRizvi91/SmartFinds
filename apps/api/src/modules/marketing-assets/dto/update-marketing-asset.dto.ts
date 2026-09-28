import { PartialType } from '@nestjs/swagger';
import { CreateMarketingAssetDto } from './create-marketing-asset.dto';

export class UpdateMarketingAssetDto extends PartialType(CreateMarketingAssetDto) {}

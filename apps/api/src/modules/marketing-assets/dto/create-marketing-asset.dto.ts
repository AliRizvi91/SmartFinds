import { IsIn, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateMarketingAssetDto {
  @IsMongoId()
  programId: string;

  @IsMongoId()
  advertiserId: string;

  @IsIn(['BANNER','LOGO','TEXT_LINK','EMAIL_TEMPLATE'])
  type: string;

  @IsString()
  url: string;

  @IsString()
  @IsOptional()
  altText?: string;

}

import { IsArray, IsDateString, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateCampaignDto {
  @IsMongoId()
  programId: string;

  @IsMongoId()
  advertiserId: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  bannerUrls?: string[];

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

}

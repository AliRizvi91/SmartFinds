import { IsMongoId, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateTrackingLinkDto {
  @IsMongoId()
  publisherId: string;

  @IsMongoId()
  programId: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsUrl()
  destinationUrl: string;

}

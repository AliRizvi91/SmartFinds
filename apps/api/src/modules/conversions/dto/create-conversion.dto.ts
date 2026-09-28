import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateConversionDto {
  @IsMongoId()
  clickId: string;

  @IsMongoId()
  trackingLinkId: string;

  @IsMongoId()
  publisherId: string;

  @IsMongoId()
  programId: string;

  @IsString()
  @IsOptional()
  orderId?: string;

  @IsNumber()
  orderValue: number;

}

import {
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePublisherDto {
  @IsString()
  @IsOptional()
  website?: string;

  @IsString()
  @IsOptional()
  niche?: string;

  @IsNumber()
  @IsOptional()
  audienceSize?: number;

  @IsString()
  @IsOptional()
  payoutMethod?: string;
}
import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateAdvertiserDto {
  @IsString()
  @MaxLength(150)
  companyName!: string;

  @IsUrl()
  @MaxLength(500)
  website!: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  industry?: string;
}
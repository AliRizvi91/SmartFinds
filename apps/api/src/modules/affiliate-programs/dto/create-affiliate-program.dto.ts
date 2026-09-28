import { IsDateString, IsEnum, IsMongoId, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { CommissionType, ProgramStatus } from '@smartfinds/types';

export class CreateAffiliateProgramDto {
  @IsMongoId()
  advertiserId: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsUrl()
  website: string;

  @IsEnum(CommissionType)
  commissionType: CommissionType;

  @IsNumber()
  commissionRate: number;

  @IsNumber()
  cookieDurationDays: number;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsString()
  @IsOptional()
  terms?: string;

  @IsString()
  @IsOptional()
  logoUrl?: string;

  @IsString()
  @IsOptional()
  bannerUrl?: string;

  @IsEnum(ProgramStatus)
  @IsOptional()
  status?: ProgramStatus;

}

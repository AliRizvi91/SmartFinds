import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateAffiliateApplicationDto {
  @IsMongoId()
  publisherId: string;

  @IsMongoId()
  programId: string;

  @IsString()
  @IsOptional()
  message?: string;

}

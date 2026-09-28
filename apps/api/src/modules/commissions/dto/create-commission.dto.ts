import { IsMongoId, IsNumber } from 'class-validator';

export class CreateCommissionDto {
  @IsMongoId()
  conversionId: string;

  @IsMongoId()
  publisherId: string;

  @IsMongoId()
  programId: string;

  @IsNumber()
  amount: number;

}

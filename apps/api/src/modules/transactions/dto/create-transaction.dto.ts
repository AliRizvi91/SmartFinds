import { IsIn, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  relatedType: string;

  @IsMongoId()
  relatedId: string;

  @IsNumber()
  amount: number;

  @IsIn(['CREDIT','DEBIT'])
  type: string;

  @IsString()
  @IsOptional()
  description?: string;

}

import { IsMongoId, IsNumber, IsString } from 'class-validator';

export class CreatePayoutDto {
  @IsMongoId()
  publisherId: string;

  @IsNumber()
  amount: number;

  @IsString()
  method: string;

}

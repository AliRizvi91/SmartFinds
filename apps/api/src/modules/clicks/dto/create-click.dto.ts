import { IsMongoId } from 'class-validator';

export class CreateClickDto {
  @IsMongoId()
  trackingLinkId: string;

  @IsMongoId()
  publisherId: string;

  @IsMongoId()
  programId: string;

}

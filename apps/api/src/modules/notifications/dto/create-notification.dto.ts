import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsMongoId()
  userId: string;

  @IsString()
  type: string;

  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsString()
  @IsOptional()
  link?: string;

}

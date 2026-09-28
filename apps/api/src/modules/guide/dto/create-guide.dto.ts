import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateGuideDto {
  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  readTime!: string;

  @IsString()
  @IsNotEmpty()
  icon!: string;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;
}
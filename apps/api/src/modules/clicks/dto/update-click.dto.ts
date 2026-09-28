import { PartialType } from '@nestjs/swagger';
import { CreateClickDto } from './create-click.dto';

export class UpdateClickDto extends PartialType(CreateClickDto) {}

import { PartialType } from '@nestjs/swagger';
import { CreateAdvertiserDto } from './create-advertiser.dto';

export class UpdateAdvertiserDto extends PartialType(CreateAdvertiserDto) {}

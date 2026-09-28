import { PartialType } from '@nestjs/swagger';
import { CreateTrackingLinkDto } from './create-tracking-link.dto';

export class UpdateTrackingLinkDto extends PartialType(CreateTrackingLinkDto) {}

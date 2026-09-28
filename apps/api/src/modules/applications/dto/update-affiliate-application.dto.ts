import { PartialType } from '@nestjs/swagger';
import { CreateAffiliateApplicationDto } from './create-affiliate-application.dto';

export class UpdateAffiliateApplicationDto extends PartialType(CreateAffiliateApplicationDto) {}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AffiliateApplicationsService } from './applications.service';
import { CreateAffiliateApplicationDto } from './dto/create-affiliate-application.dto';
import { UpdateAffiliateApplicationDto } from './dto/update-affiliate-application.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('applications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'applications', version: '1' })
export class AffiliateApplicationsController {
  constructor(private readonly affiliateApplicationsService: AffiliateApplicationsService) {}

  @Post()
  create(@Body() dto: CreateAffiliateApplicationDto) {
    return this.affiliateApplicationsService.create(dto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.affiliateApplicationsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.affiliateApplicationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAffiliateApplicationDto) {
    return this.affiliateApplicationsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.affiliateApplicationsService.remove(id);
  }
}

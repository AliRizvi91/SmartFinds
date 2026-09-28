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
import { TrackingLinksService } from './tracking-links.service';
import { CreateTrackingLinkDto } from './dto/create-tracking-link.dto';
import { UpdateTrackingLinkDto } from './dto/update-tracking-link.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('tracking-links')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'tracking-links', version: '1' })
export class TrackingLinksController {
  constructor(private readonly trackingLinksService: TrackingLinksService) {}

  @Post()
  create(@Body() dto: CreateTrackingLinkDto) {
    return this.trackingLinksService.create(dto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.trackingLinksService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackingLinksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTrackingLinkDto) {
    return this.trackingLinksService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackingLinksService.remove(id);
  }
}

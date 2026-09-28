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
import { MarketingAssetsService } from './marketing-assets.service';
import { CreateMarketingAssetDto } from './dto/create-marketing-asset.dto';
import { UpdateMarketingAssetDto } from './dto/update-marketing-asset.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('marketing-assets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'marketing-assets', version: '1' })
export class MarketingAssetsController {
  constructor(private readonly marketingAssetsService: MarketingAssetsService) {}

  @Post()
  create(@Body() dto: CreateMarketingAssetDto) {
    return this.marketingAssetsService.create(dto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.marketingAssetsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marketingAssetsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMarketingAssetDto) {
    return this.marketingAssetsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marketingAssetsService.remove(id);
  }
}

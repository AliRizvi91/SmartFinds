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
import { ClicksService } from './clicks.service';
import { CreateClickDto } from './dto/create-click.dto';
import { UpdateClickDto } from './dto/update-click.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('clicks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'clicks', version: '1' })
export class ClicksController {
  constructor(private readonly clicksService: ClicksService) {}

  @Post()
  create(@Body() dto: CreateClickDto) {
    return this.clicksService.create(dto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.clicksService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clicksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateClickDto) {
    return this.clicksService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clicksService.remove(id);
  }
}

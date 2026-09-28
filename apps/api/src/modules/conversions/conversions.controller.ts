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
import { ConversionsService } from './conversions.service';
import { CreateConversionDto } from './dto/create-conversion.dto';
import { UpdateConversionDto } from './dto/update-conversion.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('conversions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'conversions', version: '1' })
export class ConversionsController {
  constructor(private readonly conversionsService: ConversionsService) {}

  @Post()
  create(@Body() dto: CreateConversionDto) {
    return this.conversionsService.create(dto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.conversionsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conversionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateConversionDto) {
    return this.conversionsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conversionsService.remove(id);
  }
}

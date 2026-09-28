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
import { AffiliateProgramsService } from './affiliate-programs.service';
import { CreateAffiliateProgramDto } from './dto/create-affiliate-program.dto';
import { UpdateAffiliateProgramDto } from './dto/update-affiliate-program.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('affiliate-programs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'affiliate-programs', version: '1' })
export class AffiliateProgramsController {
  constructor(private readonly affiliateProgramsService: AffiliateProgramsService) {}

  @Post()
  create(@Body() dto: CreateAffiliateProgramDto) {
    return this.affiliateProgramsService.create(dto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.affiliateProgramsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.affiliateProgramsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAffiliateProgramDto) {
    return this.affiliateProgramsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.affiliateProgramsService.remove(id);
  }
}

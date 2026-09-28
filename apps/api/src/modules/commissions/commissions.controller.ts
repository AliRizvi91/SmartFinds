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
import { CommissionsService } from './commissions.service';
import { CreateCommissionDto } from './dto/create-commission.dto';
import { UpdateCommissionDto } from './dto/update-commission.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('commissions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'commissions', version: '1' })
export class CommissionsController {
  constructor(private readonly commissionsService: CommissionsService) {}

  @Post()
  create(@Body() dto: CreateCommissionDto) {
    return this.commissionsService.create(dto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.commissionsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commissionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCommissionDto) {
    return this.commissionsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commissionsService.remove(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { PublishersService } from './publishers.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('publishers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'publishers', version: '1' })
export class PublishersController {
  constructor(
    private readonly publishersService: PublishersService,
  ) { }

  @Post()
  create(
    @Req() req: Request,
    @Body() dto: CreatePublisherDto,
  ) {
    const user = req.user as {
      sub: string;
      role: string;
      email: string;
    };

    return this.publishersService.create(user.sub, dto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.publishersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publishersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePublisherDto,
  ) {
    return this.publishersService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publishersService.remove(id);
  }
}
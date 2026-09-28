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

import { AdvertisersService } from './advertisers.service';
import { CreateAdvertiserDto } from './dto/create-advertiser.dto';
import { UpdateAdvertiserDto } from './dto/update-advertiser.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface AuthenticatedRequest extends Request {
  user: {
    sub: string;
    role: string;
    email: string;
  };
}

@ApiTags('advertisers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({
  path: 'advertisers',
  version: '1',
})
export class AdvertisersController {
  constructor(
    private readonly advertisersService: AdvertisersService,
  ) {}


@Post()
create(
  @Req() req: AuthenticatedRequest,
  @Body() dto: CreateAdvertiserDto,
) {
  return this.advertisersService.create(req.user.sub, dto);
}

  @Get()
  findAll(
    @Query() query: PaginationQueryDto,
  ) {
    return this.advertisersService.findAll(query);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.advertisersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAdvertiserDto,
  ) {
    return this.advertisersService.update(id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.advertisersService.remove(id);
  }
}
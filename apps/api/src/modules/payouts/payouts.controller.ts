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
import { PayoutsService } from './payouts.service';
import { CreatePayoutDto } from './dto/create-payout.dto';
import { UpdatePayoutDto } from './dto/update-payout.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('payouts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'payouts', version: '1' })
export class PayoutsController {
  constructor(private readonly payoutsService: PayoutsService) {}

  @Post()
  create(@Body() dto: CreatePayoutDto) {
    return this.payoutsService.create(dto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.payoutsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payoutsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePayoutDto) {
    return this.payoutsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payoutsService.remove(id);
  }
}

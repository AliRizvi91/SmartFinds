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
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'transactions', version: '1' })
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() dto: CreateTransactionDto) {
    return this.transactionsService.create(dto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.transactionsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTransactionDto) {
    return this.transactionsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Injectable()
export class TransactionsService {
  constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>) {}

  create(dto: CreateTransactionDto) {
    return this.transactionModel.create(dto);
  }

  async findAll(query: PaginationQueryDto) {
    const { page, pageSize, search, sort } = query;
    const filter = search ? { $text: { $search: search } } : {};
    const [items, total] = await Promise.all([
      this.transactionModel
        .find(filter)
        .sort({ createdAt: sort === 'asc' ? 1 : -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize),
      this.transactionModel.countDocuments(filter),
    ]);
    return {
      items,
      page,
      pageSize,
      total,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    };
  }

  async findOne(id: string) {
    const doc = await this.transactionModel.findById(id);
    if (!doc) throw new NotFoundException('Transaction not found');
    return doc;
  }

  async update(id: string, dto: UpdateTransactionDto) {
    const doc = await this.transactionModel.findByIdAndUpdate(id, dto, { new: true });
    if (!doc) throw new NotFoundException('Transaction not found');
    return doc;
  }

  async remove(id: string) {
    const doc = await this.transactionModel.findByIdAndDelete(id);
    if (!doc) throw new NotFoundException('Transaction not found');
    return { __message: 'Transaction deleted' };
  }
}

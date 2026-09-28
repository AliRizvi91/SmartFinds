import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payout, PayoutDocument } from './schemas/payout.schema';
import { CreatePayoutDto } from './dto/create-payout.dto';
import { UpdatePayoutDto } from './dto/update-payout.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Injectable()
export class PayoutsService {
  constructor(@InjectModel(Payout.name) private payoutModel: Model<PayoutDocument>) {}

  create(dto: CreatePayoutDto) {
    return this.payoutModel.create(dto);
  }

  async findAll(query: PaginationQueryDto) {
    const { page, pageSize, search, sort } = query;
    const filter = search ? { $text: { $search: search } } : {};
    const [items, total] = await Promise.all([
      this.payoutModel
        .find(filter)
        .sort({ createdAt: sort === 'asc' ? 1 : -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize),
      this.payoutModel.countDocuments(filter),
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
    const doc = await this.payoutModel.findById(id);
    if (!doc) throw new NotFoundException('Payout not found');
    return doc;
  }

  async update(id: string, dto: UpdatePayoutDto) {
    const doc = await this.payoutModel.findByIdAndUpdate(id, dto, { new: true });
    if (!doc) throw new NotFoundException('Payout not found');
    return doc;
  }

  async remove(id: string) {
    const doc = await this.payoutModel.findByIdAndDelete(id);
    if (!doc) throw new NotFoundException('Payout not found');
    return { __message: 'Payout deleted' };
  }
}

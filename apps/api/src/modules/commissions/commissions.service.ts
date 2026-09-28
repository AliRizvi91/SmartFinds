import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Commission, CommissionDocument } from './schemas/commission.schema';
import { CreateCommissionDto } from './dto/create-commission.dto';
import { UpdateCommissionDto } from './dto/update-commission.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Injectable()
export class CommissionsService {
  constructor(@InjectModel(Commission.name) private commissionModel: Model<CommissionDocument>) {}

  create(dto: CreateCommissionDto) {
    return this.commissionModel.create(dto);
  }

  async findAll(query: PaginationQueryDto) {
    const { page, pageSize, search, sort } = query;
    const filter = search ? { $text: { $search: search } } : {};
    const [items, total] = await Promise.all([
      this.commissionModel
        .find(filter)
        .sort({ createdAt: sort === 'asc' ? 1 : -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize),
      this.commissionModel.countDocuments(filter),
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
    const doc = await this.commissionModel.findById(id);
    if (!doc) throw new NotFoundException('Commission not found');
    return doc;
  }

  async update(id: string, dto: UpdateCommissionDto) {
    const doc = await this.commissionModel.findByIdAndUpdate(id, dto, { new: true });
    if (!doc) throw new NotFoundException('Commission not found');
    return doc;
  }

  async remove(id: string) {
    const doc = await this.commissionModel.findByIdAndDelete(id);
    if (!doc) throw new NotFoundException('Commission not found');
    return { __message: 'Commission deleted' };
  }
}

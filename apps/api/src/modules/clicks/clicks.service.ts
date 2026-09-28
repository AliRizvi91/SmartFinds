import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Click, ClickDocument } from './schemas/click.schema';
import { CreateClickDto } from './dto/create-click.dto';
import { UpdateClickDto } from './dto/update-click.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Injectable()
export class ClicksService {
  constructor(@InjectModel(Click.name) private clickModel: Model<ClickDocument>) {}

  create(dto: CreateClickDto) {
    return this.clickModel.create(dto);
  }

  async findAll(query: PaginationQueryDto) {
    const { page, pageSize, search, sort } = query;
    const filter = search ? { $text: { $search: search } } : {};
    const [items, total] = await Promise.all([
      this.clickModel
        .find(filter)
        .sort({ createdAt: sort === 'asc' ? 1 : -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize),
      this.clickModel.countDocuments(filter),
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
    const doc = await this.clickModel.findById(id);
    if (!doc) throw new NotFoundException('Click not found');
    return doc;
  }

  async update(id: string, dto: UpdateClickDto) {
    const doc = await this.clickModel.findByIdAndUpdate(id, dto, { new: true });
    if (!doc) throw new NotFoundException('Click not found');
    return doc;
  }

  async remove(id: string) {
    const doc = await this.clickModel.findByIdAndDelete(id);
    if (!doc) throw new NotFoundException('Click not found');
    return { __message: 'Click deleted' };
  }
}

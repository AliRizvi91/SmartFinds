import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conversion, ConversionDocument } from './schemas/conversion.schema';
import { CreateConversionDto } from './dto/create-conversion.dto';
import { UpdateConversionDto } from './dto/update-conversion.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Injectable()
export class ConversionsService {
  constructor(@InjectModel(Conversion.name) private conversionModel: Model<ConversionDocument>) {}

  create(dto: CreateConversionDto) {
    return this.conversionModel.create(dto);
  }

  async findAll(query: PaginationQueryDto) {
    const { page, pageSize, search, sort } = query;
    const filter = search ? { $text: { $search: search } } : {};
    const [items, total] = await Promise.all([
      this.conversionModel
        .find(filter)
        .sort({ createdAt: sort === 'asc' ? 1 : -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize),
      this.conversionModel.countDocuments(filter),
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
    const doc = await this.conversionModel.findById(id);
    if (!doc) throw new NotFoundException('Conversion not found');
    return doc;
  }

  async update(id: string, dto: UpdateConversionDto) {
    const doc = await this.conversionModel.findByIdAndUpdate(id, dto, { new: true });
    if (!doc) throw new NotFoundException('Conversion not found');
    return doc;
  }

  async remove(id: string) {
    const doc = await this.conversionModel.findByIdAndDelete(id);
    if (!doc) throw new NotFoundException('Conversion not found');
    return { __message: 'Conversion deleted' };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publisher, PublisherDocument } from './schemas/publisher.schema';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Injectable()
export class PublishersService {
  constructor(@InjectModel(Publisher.name) private publisherModel: Model<PublisherDocument>) {}

async create(userId: string, dto: CreatePublisherDto) {
  return this.publisherModel.create({
    ...dto,
    userId,
  });
}

  async findAll(query: PaginationQueryDto) {
    const { page, pageSize, search, sort } = query;
    const filter = search ? { $text: { $search: search } } : {};
    const [items, total] = await Promise.all([
      this.publisherModel
        .find(filter)
        .sort({ createdAt: sort === 'asc' ? 1 : -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize),
      this.publisherModel.countDocuments(filter),
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
    const doc = await this.publisherModel.findById(id);
    if (!doc) throw new NotFoundException('Publisher not found');
    return doc;
  }

  async update(id: string, dto: UpdatePublisherDto) {
    const doc = await this.publisherModel.findByIdAndUpdate(id, dto, { new: true });
    if (!doc) throw new NotFoundException('Publisher not found');
    return doc;
  }

  async remove(id: string) {
    const doc = await this.publisherModel.findByIdAndDelete(id);
    if (!doc) throw new NotFoundException('Publisher not found');
    return { __message: 'Publisher deleted' };
  }
}

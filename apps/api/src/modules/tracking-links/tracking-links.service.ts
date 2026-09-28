import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TrackingLink, TrackingLinkDocument } from './schemas/tracking-link.schema';
import { CreateTrackingLinkDto } from './dto/create-tracking-link.dto';
import { UpdateTrackingLinkDto } from './dto/update-tracking-link.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Injectable()
export class TrackingLinksService {
  constructor(@InjectModel(TrackingLink.name) private trackingLinkModel: Model<TrackingLinkDocument>) {}

  create(dto: CreateTrackingLinkDto) {
    return this.trackingLinkModel.create(dto);
  }

  async findAll(query: PaginationQueryDto) {
    const { page, pageSize, search, sort } = query;
    const filter = search ? { $text: { $search: search } } : {};
    const [items, total] = await Promise.all([
      this.trackingLinkModel
        .find(filter)
        .sort({ createdAt: sort === 'asc' ? 1 : -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize),
      this.trackingLinkModel.countDocuments(filter),
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
    const doc = await this.trackingLinkModel.findById(id);
    if (!doc) throw new NotFoundException('TrackingLink not found');
    return doc;
  }

  async update(id: string, dto: UpdateTrackingLinkDto) {
    const doc = await this.trackingLinkModel.findByIdAndUpdate(id, dto, { new: true });
    if (!doc) throw new NotFoundException('TrackingLink not found');
    return doc;
  }

  async remove(id: string) {
    const doc = await this.trackingLinkModel.findByIdAndDelete(id);
    if (!doc) throw new NotFoundException('TrackingLink not found');
    return { __message: 'TrackingLink deleted' };
  }
}

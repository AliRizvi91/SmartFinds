import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AffiliateApplication, AffiliateApplicationDocument } from './schemas/affiliate-application.schema';
import { CreateAffiliateApplicationDto } from './dto/create-affiliate-application.dto';
import { UpdateAffiliateApplicationDto } from './dto/update-affiliate-application.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Injectable()
export class AffiliateApplicationsService {
  constructor(@InjectModel(AffiliateApplication.name) private affiliateApplicationModel: Model<AffiliateApplicationDocument>) {}

  create(dto: CreateAffiliateApplicationDto) {
    return this.affiliateApplicationModel.create(dto);
  }

  async findAll(query: PaginationQueryDto) {
    const { page, pageSize, search, sort } = query;
    const filter = search ? { $text: { $search: search } } : {};
    const [items, total] = await Promise.all([
      this.affiliateApplicationModel
        .find(filter)
        .sort({ createdAt: sort === 'asc' ? 1 : -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize),
      this.affiliateApplicationModel.countDocuments(filter),
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
    const doc = await this.affiliateApplicationModel.findById(id);
    if (!doc) throw new NotFoundException('AffiliateApplication not found');
    return doc;
  }

  async update(id: string, dto: UpdateAffiliateApplicationDto) {
    const doc = await this.affiliateApplicationModel.findByIdAndUpdate(id, dto, { new: true });
    if (!doc) throw new NotFoundException('AffiliateApplication not found');
    return doc;
  }

  async remove(id: string) {
    const doc = await this.affiliateApplicationModel.findByIdAndDelete(id);
    if (!doc) throw new NotFoundException('AffiliateApplication not found');
    return { __message: 'AffiliateApplication deleted' };
  }
}

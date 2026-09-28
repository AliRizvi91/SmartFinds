import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AffiliateProgram, AffiliateProgramDocument } from './schemas/affiliate-program.schema';
import { CreateAffiliateProgramDto } from './dto/create-affiliate-program.dto';
import { UpdateAffiliateProgramDto } from './dto/update-affiliate-program.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Injectable()
export class AffiliateProgramsService {
  constructor(@InjectModel(AffiliateProgram.name) private affiliateProgramModel: Model<AffiliateProgramDocument>) {}

  create(dto: CreateAffiliateProgramDto) {
    return this.affiliateProgramModel.create(dto);
  }

  async findAll(query: PaginationQueryDto) {
    const { page, pageSize, search, sort } = query;
    const filter = search ? { $text: { $search: search } } : {};
    const [items, total] = await Promise.all([
      this.affiliateProgramModel
        .find(filter)
        .sort({ createdAt: sort === 'asc' ? 1 : -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize),
      this.affiliateProgramModel.countDocuments(filter),
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
    const doc = await this.affiliateProgramModel.findById(id);
    if (!doc) throw new NotFoundException('AffiliateProgram not found');
    return doc;
  }

  async update(id: string, dto: UpdateAffiliateProgramDto) {
    const doc = await this.affiliateProgramModel.findByIdAndUpdate(id, dto, { new: true });
    if (!doc) throw new NotFoundException('AffiliateProgram not found');
    return doc;
  }

  async remove(id: string) {
    const doc = await this.affiliateProgramModel.findByIdAndDelete(id);
    if (!doc) throw new NotFoundException('AffiliateProgram not found');
    return { __message: 'AffiliateProgram deleted' };
  }
}

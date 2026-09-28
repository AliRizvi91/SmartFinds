import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campaign, CampaignDocument } from './schemas/campaign.schema';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Injectable()
export class CampaignsService {
  constructor(@InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>) {}

  create(dto: CreateCampaignDto) {
    return this.campaignModel.create(dto);
  }

  async findAll(query: PaginationQueryDto) {
    const { page, pageSize, search, sort } = query;
    const filter = search ? { $text: { $search: search } } : {};
    const [items, total] = await Promise.all([
      this.campaignModel
        .find(filter)
        .sort({ createdAt: sort === 'asc' ? 1 : -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize),
      this.campaignModel.countDocuments(filter),
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
    const doc = await this.campaignModel.findById(id);
    if (!doc) throw new NotFoundException('Campaign not found');
    return doc;
  }

  async update(id: string, dto: UpdateCampaignDto) {
    const doc = await this.campaignModel.findByIdAndUpdate(id, dto, { new: true });
    if (!doc) throw new NotFoundException('Campaign not found');
    return doc;
  }

  async remove(id: string) {
    const doc = await this.campaignModel.findByIdAndDelete(id);
    if (!doc) throw new NotFoundException('Campaign not found');
    return { __message: 'Campaign deleted' };
  }
}

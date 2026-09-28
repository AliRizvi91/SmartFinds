import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MarketingAsset, MarketingAssetDocument } from './schemas/marketing-asset.schema';
import { CreateMarketingAssetDto } from './dto/create-marketing-asset.dto';
import { UpdateMarketingAssetDto } from './dto/update-marketing-asset.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Injectable()
export class MarketingAssetsService {
  constructor(@InjectModel(MarketingAsset.name) private marketingAssetModel: Model<MarketingAssetDocument>) {}

  create(dto: CreateMarketingAssetDto) {
    return this.marketingAssetModel.create(dto);
  }

  async findAll(query: PaginationQueryDto) {
    const { page, pageSize, search, sort } = query;
    const filter = search ? { $text: { $search: search } } : {};
    const [items, total] = await Promise.all([
      this.marketingAssetModel
        .find(filter)
        .sort({ createdAt: sort === 'asc' ? 1 : -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize),
      this.marketingAssetModel.countDocuments(filter),
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
    const doc = await this.marketingAssetModel.findById(id);
    if (!doc) throw new NotFoundException('MarketingAsset not found');
    return doc;
  }

  async update(id: string, dto: UpdateMarketingAssetDto) {
    const doc = await this.marketingAssetModel.findByIdAndUpdate(id, dto, { new: true });
    if (!doc) throw new NotFoundException('MarketingAsset not found');
    return doc;
  }

  async remove(id: string) {
    const doc = await this.marketingAssetModel.findByIdAndDelete(id);
    if (!doc) throw new NotFoundException('MarketingAsset not found');
    return { __message: 'MarketingAsset deleted' };
  }
}

import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Guide,
  GuideDocument,
} from './schemas/guide.schema';

import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';

@Injectable()
export class GuideService {
  constructor(
    @InjectModel(Guide.name)
    private readonly guideModel: Model<GuideDocument>,
  ) {}

  async create(createGuideDto: CreateGuideDto) {
    const guide = await this.guideModel.create(createGuideDto);

    return guide;
  }

  async findAll() {
    return this.guideModel
      .find()
      .sort({ createdAt: -1 })
      .lean();
  }

  async findFeatured() {
    return this.guideModel
      .find({ featured: true })
      .sort({ createdAt: -1 })
      .lean();
  }

  async findOne(id: string) {
    const guide = await this.guideModel
      .findById(id)
      .lean();

    if (!guide) {
      throw new NotFoundException('Guide not found');
    }

    return guide;
  }

  async update(
    id: string,
    updateGuideDto: UpdateGuideDto,
  ) {
    const guide = await this.guideModel
      .findByIdAndUpdate(
        id,
        updateGuideDto,
        {
          new: true,
          runValidators: true,
        },
      )
      .lean();

    if (!guide) {
      throw new NotFoundException('Guide not found');
    }

    return guide;
  }

  async remove(id: string) {
    const guide = await this.guideModel.findByIdAndDelete(id);

    if (!guide) {
      throw new NotFoundException('Guide not found');
    }

    return {
      message: 'Guide deleted successfully',
    };
  }
}
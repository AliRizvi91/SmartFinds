import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model , Types } from 'mongoose';

import {
  Advertiser,
  AdvertiserDocument,
} from './schemas/advertiser.schema';

import { CreateAdvertiserDto } from './dto/create-advertiser.dto';
import { UpdateAdvertiserDto } from './dto/update-advertiser.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';


@Injectable()
export class AdvertisersService {
  constructor(
    @InjectModel(Advertiser.name)
    private readonly advertiserModel: Model<AdvertiserDocument>,
  ) {}

  async create(
    userId: string,
    dto: CreateAdvertiserDto,
  ) {
    // Make sure the authenticated user ID is valid
    if (!Types.ObjectId.isValid(userId)) {
      throw new ConflictException(
        'Invalid authenticated user ID',
      );
    }

    // Prevent duplicate advertiser profiles
    const existingAdvertiser =
      await this.advertiserModel.findOne({
        userId: new Types.ObjectId(userId),
      });

    if (existingAdvertiser) {
      throw new ConflictException(
        'Advertiser profile already exists for this account',
      );
    }

    const advertiser =
      await this.advertiserModel.create({
        userId: new Types.ObjectId(userId),
        companyName: dto.companyName,
        website: dto.website,
        industry: dto.industry,
      });

    return {
      success: true,
      data: advertiser,
      message: 'Advertiser account created successfully',
    };
  }


  // =====================================================
  // GET ALL ADVERTISERS
  // =====================================================

  async findAll(
    query: PaginationQueryDto,
  ) {
    const {
      page,
      pageSize,
      search,
      sort,
    } = query;

    const filter = search
      ? {
          $or: [
            {
              companyName: {
                $regex: search,
                $options: 'i',
              },
            },
            {
              industry: {
                $regex: search,
                $options: 'i',
              },
            },
          ],
        }
      : {};

    const [items, total] =
      await Promise.all([
        this.advertiserModel
          .find(filter)
          .sort({
            createdAt:
              sort === 'asc' ? 1 : -1,
          })
          .skip((page - 1) * pageSize)
          .limit(pageSize)
          .lean(),

        this.advertiserModel.countDocuments(
          filter,
        ),
      ]);

    return {
      success: true,
      data: {
        items,
        page,
        pageSize,
        total,
        totalPages: Math.max(
          1,
          Math.ceil(total / pageSize),
        ),
      },
      message: 'Advertisers fetched successfully',
    };
  }

  // =====================================================
  // GET ONE
  // =====================================================

  async findOne(id: string) {
    const advertiser =
      await this.advertiserModel.findById(id);

    if (!advertiser) {
      throw new NotFoundException(
        'Advertiser not found',
      );
    }

    return {
      success: true,
      data: advertiser,
      message: 'Advertiser fetched successfully',
    };
  }

  // =====================================================
  // UPDATE
  // =====================================================

  async update(
    id: string,
    dto: UpdateAdvertiserDto,
  ) {
    const advertiser =
      await this.advertiserModel.findByIdAndUpdate(
        id,
        dto,
        {
          new: true,
          runValidators: true,
        },
      );

    if (!advertiser) {
      throw new NotFoundException(
        'Advertiser not found',
      );
    }

    return {
      success: true,
      data: advertiser,
      message: 'Advertiser updated successfully',
    };
  }

  // =====================================================
  // DELETE
  // =====================================================

  async remove(id: string) {
    const advertiser =
      await this.advertiserModel.findByIdAndDelete(id);

    if (!advertiser) {
      throw new NotFoundException(
        'Advertiser not found',
      );
    }

    return {
      success: true,
      message: 'Advertiser deleted successfully',
    };
  }
}
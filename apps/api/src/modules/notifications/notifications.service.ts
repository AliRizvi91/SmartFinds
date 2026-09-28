import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './schemas/notification.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>) {}

  create(dto: CreateNotificationDto) {
    return this.notificationModel.create(dto);
  }

  async findAll(query: PaginationQueryDto) {
    const { page, pageSize, search, sort } = query;
    const filter = search ? { $text: { $search: search } } : {};
    const [items, total] = await Promise.all([
      this.notificationModel
        .find(filter)
        .sort({ createdAt: sort === 'asc' ? 1 : -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize),
      this.notificationModel.countDocuments(filter),
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
    const doc = await this.notificationModel.findById(id);
    if (!doc) throw new NotFoundException('Notification not found');
    return doc;
  }

  async update(id: string, dto: UpdateNotificationDto) {
    const doc = await this.notificationModel.findByIdAndUpdate(id, dto, { new: true });
    if (!doc) throw new NotFoundException('Notification not found');
    return doc;
  }

  async remove(id: string) {
    const doc = await this.notificationModel.findByIdAndDelete(id);
    if (!doc) throw new NotFoundException('Notification not found');
    return { __message: 'Notification deleted' };
  }
}

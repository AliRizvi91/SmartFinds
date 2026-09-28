import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AdvertiserDocument = Advertiser & Document;

@Schema({
  timestamps: true,
  collection: 'advertisers',
})
export class Advertiser {
  _id!: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true,
  })
  userId!: Types.ObjectId;

  @Prop({
    required: true,
    trim: true,
  })
  companyName!: string;

  @Prop({
    required: true,
    trim: true,
  })
  website?: string;

  @Prop({
    trim: true,
  })
  industry?: string;

  @Prop({
    trim: true,
  })
  logoUrl?: string;

  @Prop({
    default: false,
    index: true,
  })
  isVerified!: boolean;

  createdAt!: Date;

  updatedAt!: Date;
}

export const AdvertiserSchema = SchemaFactory.createForClass(Advertiser);
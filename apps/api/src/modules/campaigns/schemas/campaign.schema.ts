import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CampaignDocument = Campaign & Document;

@Schema({ timestamps: true })
export class Campaign {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'AffiliateProgram', required: true, index: true })
  programId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Advertiser', required: true, index: true })
  advertiserId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [String], default: [] })
  bannerUrls: string[];

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ default: true })
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);

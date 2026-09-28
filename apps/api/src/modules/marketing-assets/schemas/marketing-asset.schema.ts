import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MarketingAssetDocument = MarketingAsset & Document;

@Schema({ timestamps: true })
export class MarketingAsset {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'AffiliateProgram', required: true, index: true })
  programId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Advertiser', required: true, index: true })
  advertiserId: Types.ObjectId;

  @Prop({ required: true, enum: ['BANNER', 'LOGO', 'TEXT_LINK', 'EMAIL_TEMPLATE'] })
  type: string;

  @Prop({ required: true })
  url: string;

  @Prop()
  altText: string;

  createdAt: Date;
  updatedAt: Date;
}

export const MarketingAssetSchema = SchemaFactory.createForClass(MarketingAsset);

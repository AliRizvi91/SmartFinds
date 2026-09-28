import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ConversionDocument = Conversion & Document;

@Schema({ timestamps: true })
export class Conversion {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Click', required: true, index: true })
  clickId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'TrackingLink', required: true, index: true })
  trackingLinkId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Publisher', required: true, index: true })
  publisherId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'AffiliateProgram', required: true, index: true })
  programId: Types.ObjectId;

  @Prop()
  orderId: string;

  @Prop({ required: true })
  orderValue: number;

  @Prop({ default: false })
  isApproved: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export const ConversionSchema = SchemaFactory.createForClass(Conversion);

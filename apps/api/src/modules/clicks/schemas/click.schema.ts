import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ClickDocument = Click & Document;

@Schema({ timestamps: true })
export class Click {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'TrackingLink', required: true, index: true })
  trackingLinkId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Publisher', required: true, index: true })
  publisherId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'AffiliateProgram', required: true, index: true })
  programId: Types.ObjectId;

  @Prop()
  ipHash: string;

  @Prop()
  userAgent: string;

  @Prop()
  referrer: string;

  @Prop()
  country: string;

  createdAt: Date;
  updatedAt: Date;
}

export const ClickSchema = SchemaFactory.createForClass(Click);

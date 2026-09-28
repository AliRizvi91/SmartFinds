import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TrackingLinkDocument = TrackingLink & Document;

@Schema({ timestamps: true })
export class TrackingLink {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Publisher', required: true, index: true })
  publisherId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'AffiliateProgram', required: true, index: true })
  programId: Types.ObjectId;

  @Prop({ required: true, unique: true, index: true })
  slug: string;

  @Prop({ required: true })
  destinationUrl: string;

  @Prop({ default: 0 })
  clicks: number;

  @Prop({ default: 0 })
  conversions: number;

  createdAt: Date;
  updatedAt: Date;
}

export const TrackingLinkSchema = SchemaFactory.createForClass(TrackingLink);

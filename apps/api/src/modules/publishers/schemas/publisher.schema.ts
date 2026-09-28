import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PublisherDocument = Publisher & Document;

@Schema({ timestamps: true })
export class Publisher {
  _id: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true,
  })
  userId: Types.ObjectId;

  @Prop()
  website?: string;

  @Prop()
  niche?: string;

  @Prop({ default: 0 })
  audienceSize: number;

  @Prop()
  payoutMethod?: string;

  @Prop({ default: false })
  isVerified: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export const PublisherSchema = SchemaFactory.createForClass(Publisher);
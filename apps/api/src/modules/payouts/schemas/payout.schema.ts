import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PayoutStatus } from '@smartfinds/types';

export type PayoutDocument = Payout & Document;

@Schema({ timestamps: true })
export class Payout {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Publisher', required: true, index: true })
  publisherId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  method: string;

  @Prop({ type: String, enum: PayoutStatus, default: PayoutStatus.REQUESTED, index: true })
  status: PayoutStatus;

  @Prop()
  processedAt: Date;

  createdAt: Date;
  updatedAt: Date;
}

export const PayoutSchema = SchemaFactory.createForClass(Payout);

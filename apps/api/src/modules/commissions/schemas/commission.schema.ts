import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CommissionStatus } from '@smartfinds/types';

export type CommissionDocument = Commission & Document;

@Schema({ timestamps: true })
export class Commission {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Conversion', required: true, index: true })
  conversionId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Publisher', required: true, index: true })
  publisherId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'AffiliateProgram', required: true, index: true })
  programId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: String, enum: CommissionStatus, default: CommissionStatus.PENDING, index: true })
  status: CommissionStatus;

  createdAt: Date;
  updatedAt: Date;
}

export const CommissionSchema = SchemaFactory.createForClass(Commission);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CommissionType, ProgramStatus } from '@smartfinds/types';

export type AffiliateProgramDocument = AffiliateProgram & Document;

@Schema({ timestamps: true })
export class AffiliateProgram {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Advertiser', required: true, index: true })
  advertiserId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, index: true })
  category: string;

  @Prop({ required: true })
  website: string;

  @Prop({ type: String, enum: CommissionType, required: true })
  commissionType: CommissionType;

  @Prop({ required: true })
  commissionRate: number;

  @Prop({ required: true, default: 30 })
  cookieDurationDays: number;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  terms: string;

  @Prop()
  logoUrl: string;

  @Prop()
  bannerUrl: string;

  @Prop({ type: String, enum: ProgramStatus, default: ProgramStatus.DRAFT, index: true })
  status: ProgramStatus;

  createdAt: Date;
  updatedAt: Date;
}

export const AffiliateProgramSchema = SchemaFactory.createForClass(AffiliateProgram);

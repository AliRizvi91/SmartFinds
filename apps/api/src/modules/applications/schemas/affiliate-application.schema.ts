import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApplicationStatus } from '@smartfinds/types';

export type AffiliateApplicationDocument = AffiliateApplication & Document;

@Schema({ timestamps: true })
export class AffiliateApplication {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Publisher', required: true, index: true })
  publisherId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'AffiliateProgram', required: true, index: true })
  programId: Types.ObjectId;

  @Prop({ type: String, enum: ApplicationStatus, default: ApplicationStatus.PENDING, index: true })
  status: ApplicationStatus;

  @Prop()
  message: string;

  @Prop()
  reviewedAt: Date;

  createdAt: Date;
  updatedAt: Date;
}

export const AffiliateApplicationSchema = SchemaFactory.createForClass(AffiliateApplication);

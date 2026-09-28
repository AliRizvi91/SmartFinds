import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
  _id: Types.ObjectId;

  @Prop({ required: true })
  relatedType: string;

  @Prop({ type: Types.ObjectId, required: true, index: true })
  relatedId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, enum: ['CREDIT', 'DEBIT'] })
  type: string;

  @Prop()
  description: string;

  createdAt: Date;
  updatedAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

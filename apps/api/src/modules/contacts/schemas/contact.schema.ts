import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContactDocument = HydratedDocument<Contact>;

@Schema({
  timestamps: true,
})
export class Contact {
  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    trim: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    required: true,
    trim: true,
  })
  subject: string;

  @Prop({
    required: true,
    trim: true,
  })
  message: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
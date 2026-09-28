import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GuideDocument = HydratedDocument<Guide>;

@Schema({
  timestamps: true,
  collection: 'guides',
})
export class Guide {
  @Prop({
    required: true,
    trim: true,
  })
  category!: string;

  @Prop({
    required: true,
    trim: true,
  })
  title!: string;

  @Prop({
    required: true,
    trim: true,
  })
  description!: string;

  @Prop({
    required: true,
    trim: true,
  })
  readTime!: string;

  @Prop({
    required: true,
    trim: true,
  })
  icon!: string;

  @Prop({
    default: false,
  })
  featured!: boolean;
}

export const GuideSchema = SchemaFactory.createForClass(Guide);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserRole } from '@smartfinds/types';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  collection: 'users',
})
export class User {
  _id!: Types.ObjectId;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  })
  email!: string;

  @Prop({
    required: true,
    select: false,
  })
  passwordHash!: string;

  @Prop({
    required: true,
    trim: true,
    minlength: 2,
  })
  name!: string;

  @Prop({
    type: String,
    enum: UserRole,
    required: true,
    index: true,
  })
  role!: UserRole;

  @Prop()
  avatarUrl?: string;

  @Prop({
    default: false,
  })
  isEmailVerified!: boolean;

  // Email verification
  @Prop({
    type: String,
    select: false,
    default: null,
  })
  emailVerificationToken?: string | null;

  // Password reset token
  @Prop({
    type: String,
    select: false,
    default: null,
  })
  passwordResetToken!: string | null;

  // Password reset token expiry
  @Prop({
    type: Date,
    default: null,
  })
  passwordResetExpires!: Date | null;

  // Refresh token
  @Prop({
    type: String,
    select: false,
    default: null,
  })
  refreshTokenHash?: string | null;

  // Login OTP
  @Prop({
    type: String,
    select: false,
    default: null,
  })
  loginOtpHash?: string | null;

  @Prop({
    type: Date,
    default: null,
  })
  loginOtpExpires?: Date | null;

  @Prop({
    type: Date,
    default: null,
  })
  loginOtpLastSentAt?: Date | null;

  // Email verification OTP
  @Prop({
    type: String,
    select: false,
    default: null,
  })
  emailVerificationOtpHash?: string | null;

  @Prop({
    type: Date,
    default: null,
  })
  emailVerificationOtpExpires?: Date | null;

  @Prop({
    type: Date,
    default: null,
  })
  emailVerificationOtpLastSentAt?: Date | null;

  // Account status
  @Prop({
    type: Boolean,
    default: true,
    index: true,
  })
  isActive!: boolean;

  createdAt!: Date;

  updatedAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Compound index
UserSchema.index({
  role: 1,
  createdAt: -1,
});
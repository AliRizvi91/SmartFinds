import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcryptjs';

import {
  User,
  UserDocument,
} from './schemas/user.schema';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const SALT_ROUNDS = 12;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * Create a new user.
   *
   * The DTO contains a plain-text password.
   * The password is hashed before saving to MongoDB.
   */

async create(
  dto: CreateUserDto,
): Promise<UserDocument> {
  const email = dto.email.trim().toLowerCase();
  const name = dto.name.trim();

  const existingUser = await this.userModel
    .findOne({ email })
    .select('_id')
    .lean();

  if (existingUser) {
    throw new ConflictException(
      'An account with this email already exists',
    );
  }



return this.userModel.create({
  email,
  passwordHash: dto.passwordHash,
  name,
  role: dto.role,
  avatarUrl: dto.avatarUrl,
});
}

  /**
   * Find user by email.
   *
   * passwordHash and refreshTokenHash use
   * select:false in the schema, so explicitly
   * select them for authentication.
   */
async findByEmail(email: string) {
  return this.userModel
    .findOne({
      email: email.trim().toLowerCase(),
    })
    .select(
      '+passwordHash +refreshTokenHash +loginOtpHash +emailVerificationToken +emailVerificationOtpHash +emailVerificationOtpExpires +emailVerificationOtpLastSentAt',
    )
    .exec();
}

async findUsersWithPasswordResetToken() {
  return this.userModel
    .find({
      passwordResetToken: {
        $exists: true,
        $ne: null,
      },
      passwordResetExpires: {
        $gt: new Date(),
      },
    })
    .select(
      '+passwordResetToken +passwordResetExpires',
    )
    .exec();
}

  /**
   * Find user by ID.
   *
   * Sensitive fields remain excluded.
   */
  async findById(
    id: string,
  ): Promise<UserDocument> {
    const user = await this.userModel
      .findById(id);

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    return user;
  }

  /**
   * Find all users.
   *
   * Sensitive fields are excluded by
   * select:false in the schema.
   */
async findAll() {
  const users = await this.userModel
    .find()
    .select(
      '-passwordHash -refreshTokenHash -passwordResetToken -passwordResetExpires -loginOtpHash -loginOtpExpires -emailVerificationOtpHash -emailVerificationOtpExpires',
    )
    .sort({ createdAt: -1 })
    .lean();

  return users;
}

  /**
   * Update user profile.
   *
   * Only fields allowed by UpdateUserDto
   * can be updated.
   */
  async update(
    id: string,
    dto: UpdateUserDto,
  ): Promise<UserDocument> {
    const updateData = {
      ...dto,
      ...(dto.name
        ? {
            name: dto.name.trim(),
          }
        : {}),
    };

    const user =
      await this.userModel.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
          runValidators: true,
        },
      );

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    return user;
  }

  /**
   * Save hashed refresh token.
   *
   * The raw refresh token is NEVER stored
   * in MongoDB.
   */
  async setRefreshTokenHash(
    id: string,
    refreshTokenHash: string | null,
  ) {
    const user =
      await this.userModel.findByIdAndUpdate(
        id,
        {
          refreshTokenHash,
        },
        {
          new: true,
        },
      );

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    return user;
  }

  /**
   * Remove refresh token from the database.
   *
   * Used during logout.
   */
  async clearRefreshToken(
    id: string,
  ) {
    return this.setRefreshTokenHash(
      id,
      null,
    );
  }

  async updateLoginOtp(
  userId: string,
  data: {
    loginOtpHash?: string | null;
    loginOtpExpires?: Date | null;
    loginOtpLastSentAt?: Date | null;
  },
) {
  return this.userModel.findByIdAndUpdate(
    userId,
    {
      $set: data,
    },
    {
      new: true,
    },
  );
}

  async updateEmailVerificationOtp(
  userId: string,
  data: {
    emailVerificationOtpHash?: string | null;
    emailVerificationOtpExpires?: Date | null;
    emailVerificationOtpLastSentAt?: Date | null;
    isEmailVerified?: boolean;
  },
) {
  return this.userModel.findByIdAndUpdate(
    userId,
    {
      $set: data,
    },
    {
      new: true,
    },
  );
}

  /**
   * Deactivate user account.
   */
  async deactivate(
    id: string,
  ): Promise<UserDocument> {
    const user =
      await this.userModel.findByIdAndUpdate(
        id,
        {
          isActive: false,
        },
        {
          new: true,
        },
      );

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    return user;
  }
}

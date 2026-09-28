import { PartialType, OmitType } from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['passwordHash', 'role'] as const),
) {
  loginOtpHash?: string | null;
  loginOtpExpires?: Date | null;
  loginOtpLastSentAt?: Date | null;
}
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';

import { UserRole } from '@smartfinds/types';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('users')
@ApiBearerAuth()
@Controller({
  path: 'users',
  version: '1',
})
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  /**
   * GET /api/v1/users/me
   *
   * Get currently authenticated user.
   */
  @Get('me')
  getProfile(
    @CurrentUser('sub') userId: string,
  ) {
    return this.usersService.findById(userId);
  }

  /**
   * PATCH /api/v1/users/me
   *
   * Update currently authenticated user.
   */
  @Patch('me')
  updateProfile(
    @CurrentUser('sub') userId: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(
      userId,
      dto,
    );
  }

  /**
   * GET /api/v1/users
   *
   * Admin only.
   */
  @Get()
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * GET /api/v1/users/:id
   *
   * Admin only.
   */
  @Get(':id')
  @Roles(UserRole.ADMIN)
  findOne(
    @Param('id') id: string,
  ) {
    return this.usersService.findById(id);
  }
}

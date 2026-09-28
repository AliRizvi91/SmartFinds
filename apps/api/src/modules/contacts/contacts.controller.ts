import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';

import { UserRole } from '@smartfinds/types';

import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
3
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('contacts')
@Controller({
  path: 'contacts',
  version: '1',
})
export class ContactsController {
  constructor(
    private readonly contactsService: ContactsService,
  ) {}

  /**
   * POST /api/v1/contacts
   *
   * Public contact form submission.
   */
  @Post()
  create(
    @Body() dto: CreateContactDto,
  ) {
    return this.contactsService.create(dto);
  }

  /**
   * GET /api/v1/contacts
   *
   * Admin only.
   */
  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.contactsService.findAll();
  }

  /**
   * GET /api/v1/contacts/:id
   *
   * Admin only.
   */
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  findOne(
    @Param('id') id: string,
  ) {
    return this.contactsService.findById(id);
  }
}
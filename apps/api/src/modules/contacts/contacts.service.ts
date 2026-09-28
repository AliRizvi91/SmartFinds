import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Contact,
  ContactDocument,
} from './schemas/contact.schema';

import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name)
    private readonly contactModel: Model<ContactDocument>,
  ) {}

  // CREATE CONTACT
  async create(dto: CreateContactDto) {
    const contact = await this.contactModel.create(dto);

    return contact;
  }

  // GET ALL CONTACTS
  async findAll() {
    return this.contactModel
      .find()
      .sort({ createdAt: -1 })
      .lean();
  }

  // GET SINGLE CONTACT
  async findById(id: string) {
    const contact = await this.contactModel
      .findById(id)
      .lean();

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    return contact;
  }
}
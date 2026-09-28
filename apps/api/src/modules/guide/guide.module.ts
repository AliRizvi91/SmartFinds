import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Guide,
  GuideSchema,
} from './schemas/guide.schema';

import { GuideController } from './guide.controller';
import { GuideService } from './guide.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Guide.name,
        schema: GuideSchema,
      },
    ]),
  ],
  controllers: [GuideController],
  providers: [GuideService],
  exports: [GuideService],
})
export class GuideModule {}
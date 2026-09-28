import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackingLink, TrackingLinkSchema } from './schemas/tracking-link.schema';
import { TrackingLinksService } from './tracking-links.service';
import { TrackingLinksController } from './tracking-links.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: TrackingLink.name, schema: TrackingLinkSchema }])],
  controllers: [TrackingLinksController],
  providers: [TrackingLinksService],
  exports: [TrackingLinksService],
})
export class TrackingLinksModule {}

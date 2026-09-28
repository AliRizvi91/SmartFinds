import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Click, ClickSchema } from './schemas/click.schema';
import { ClicksService } from './clicks.service';
import { ClicksController } from './clicks.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Click.name, schema: ClickSchema }])],
  controllers: [ClicksController],
  providers: [ClicksService],
  exports: [ClicksService],
})
export class ClicksModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Conversion, ConversionSchema } from './schemas/conversion.schema';
import { ConversionsService } from './conversions.service';
import { ConversionsController } from './conversions.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Conversion.name, schema: ConversionSchema }])],
  controllers: [ConversionsController],
  providers: [ConversionsService],
  exports: [ConversionsService],
})
export class ConversionsModule {}

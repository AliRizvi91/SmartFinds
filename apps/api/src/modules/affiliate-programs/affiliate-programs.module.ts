import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AffiliateProgram, AffiliateProgramSchema } from './schemas/affiliate-program.schema';
import { AffiliateProgramsService } from './affiliate-programs.service';
import { AffiliateProgramsController } from './affiliate-programs.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: AffiliateProgram.name, schema: AffiliateProgramSchema }])],
  controllers: [AffiliateProgramsController],
  providers: [AffiliateProgramsService],
  exports: [AffiliateProgramsService],
})
export class AffiliateProgramsModule {}

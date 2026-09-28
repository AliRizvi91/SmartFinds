import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AffiliateProgramsModule } from '../affiliate-programs/affiliate-programs.module';
import { PayoutsModule } from '../payouts/payouts.module';
import { AdminController } from './admin.controller';

@Module({
  imports: [UsersModule, AffiliateProgramsModule, PayoutsModule],
  controllers: [AdminController],
})
export class AdminModule {}

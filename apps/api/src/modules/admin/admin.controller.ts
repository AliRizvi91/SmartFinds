import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@smartfinds/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UsersService } from '../users/users.service';
import { AffiliateProgramsService } from '../affiliate-programs/affiliate-programs.service';
import { PayoutsService } from '../payouts/payouts.service';

/**
 * Cross-domain administrative surface. Read paths mostly delegate to each
 * domain's own service (kept as the single source of truth); admin-only
 * mutations like approving a program or a payout live here.
 */
@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller({ path: 'admin', version: '1' })
export class AdminController {
  constructor(
    private readonly usersService: UsersService,
    private readonly programsService: AffiliateProgramsService,
    private readonly payoutsService: PayoutsService,
  ) {}

  @Get('users')
  listUsers() {
    return this.usersService.findAll();
  }

  @Patch('users/:id/deactivate')
  deactivateUser(@Param('id') id: string) {
    return this.usersService.deactivate(id);
  }

  @Get('programs/pending')
  listPendingPrograms() {
    return this.programsService.findAll({ page: 1, pageSize: 50, sort: 'desc' } as any);
  }

  @Get('payouts/pending')
  listPendingPayouts() {
    return this.payoutsService.findAll({ page: 1, pageSize: 50, sort: 'desc' } as any);
  }
}

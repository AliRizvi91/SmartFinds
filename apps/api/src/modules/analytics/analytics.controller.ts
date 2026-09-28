import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AnalyticsService, AnalyticsRange } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('analytics')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'analytics', version: '1' })
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('overview')
  overview(
    @Query('range') range: AnalyticsRange = '30d',
    @CurrentUser() user: { sub: string; role: string },
  ) {
    // NOTE: scope should be derived server-side from the authenticated user's
    // advertiser/publisher profile, not trusted from the query string.
    void user;
    return this.analyticsService.getOverviewKpis(range);
  }

  @Get('series')
  series(
    @Query('metric') metric: 'clicks' | 'conversions' | 'commission' = 'clicks',
    @Query('range') range: AnalyticsRange = '30d',
  ) {
    return this.analyticsService.getTimeSeries(metric, range);
  }
}

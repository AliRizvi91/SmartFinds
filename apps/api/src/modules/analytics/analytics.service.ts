import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Click, ClickDocument } from '../clicks/schemas/click.schema';
import { Conversion, ConversionDocument } from '../conversions/schemas/conversion.schema';
import { Commission, CommissionDocument } from '../commissions/schemas/commission.schema';
import { DashboardKpi } from '@smartfinds/types';

export type AnalyticsRange = '7d' | '30d' | '90d' | '12m' | 'custom';

function rangeToDate(range: AnalyticsRange): Date {
  const now = new Date();
  switch (range) {
    case '7d':
      return new Date(now.setDate(now.getDate() - 7));
    case '30d':
      return new Date(now.setDate(now.getDate() - 30));
    case '90d':
      return new Date(now.setDate(now.getDate() - 90));
    case '12m':
      return new Date(now.setMonth(now.getMonth() - 12));
    default:
      return new Date(now.setDate(now.getDate() - 30));
  }
}

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Click.name) private clickModel: Model<ClickDocument>,
    @InjectModel(Conversion.name) private conversionModel: Model<ConversionDocument>,
    @InjectModel(Commission.name) private commissionModel: Model<CommissionDocument>,
  ) {}

  /**
   * High-level KPI summary for a dashboard overview card row.
   * Scoped by an optional filter (e.g. { publisherId } or { programId })
   * so the same method serves advertiser, publisher, and admin dashboards.
   */
  async getOverviewKpis(
    range: AnalyticsRange,
    scope: Record<string, unknown> = {},
  ): Promise<DashboardKpi[]> {
    const since = rangeToDate(range);
    const dateFilter = { createdAt: { $gte: since }, ...scope };

    const [clicks, conversions, commissionAgg] = await Promise.all([
      this.clickModel.countDocuments(dateFilter),
      this.conversionModel.countDocuments(dateFilter),
      this.commissionModel.aggregate([
        { $match: dateFilter },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
    ]);

    const commissionTotal = commissionAgg[0]?.total ?? 0;
    const conversionRate = clicks > 0 ? (conversions / clicks) * 100 : 0;
    const epc = clicks > 0 ? commissionTotal / clicks : 0;

    return [
      { label: 'Clicks', value: clicks, format: 'number' },
      { label: 'Conversions', value: conversions, format: 'number' },
      { label: 'Conversion rate', value: Number(conversionRate.toFixed(2)), format: 'percent' },
      { label: 'Commission', value: Number(commissionTotal.toFixed(2)), format: 'currency' },
      { label: 'EPC', value: Number(epc.toFixed(2)), format: 'currency' },
    ];
  }

  /** Time-bucketed series for line charts (clicks/conversions/commission over time). */
  async getTimeSeries(
    metric: 'clicks' | 'conversions' | 'commission',
    range: AnalyticsRange,
    scope: Record<string, unknown> = {},
  ) {
    const since = rangeToDate(range);
    const model =
      metric === 'clicks'
        ? this.clickModel
        : metric === 'conversions'
          ? this.conversionModel
          : this.commissionModel;

    const groupStage: any = {
      _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
      value: metric === 'commission' ? { $sum: '$amount' } : { $sum: 1 },
    };

    return model.aggregate([
      { $match: { createdAt: { $gte: since }, ...scope } },
      { $group: groupStage },
      { $sort: { _id: 1 } },
    ]);
  }
}

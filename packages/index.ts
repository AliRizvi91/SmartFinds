export * from './src/types/auth.types';

// Shared domain types used by both apps/web and apps/api.
// Kept framework-agnostic so either app can consume it.

export enum UserRole {
  ADMIN = 'ADMIN',
  ADVERTISER = 'ADVERTISER',
  PUBLISHER = 'PUBLISHER',
}
export enum ProgramStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  EXPIRED = 'EXPIRED',
  REJECTED = 'REJECTED',
}

export enum CommissionType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED',
}

export enum ApplicationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum CommissionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PAID = 'PAID',
}

export enum PayoutStatus {
  REQUESTED = 'REQUESTED',
  PROCESSING = 'PROCESSING',
  PAID = 'PAID',
  FAILED = 'FAILED',
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
  message: string;
}

export interface ApiError {
  success: false;
  message: string;
  error: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface UserSummary {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface AffiliateProgramSummary {
  id: string;
  advertiserId: string;
  name: string;
  description: string;
  category: string;
  website: string;
  commissionType: CommissionType;
  commissionRate: number;
  cookieDurationDays: number;
  status: ProgramStatus;
  logoUrl?: string;
  bannerUrl?: string;
  epc?: number;
  createdAt: string;
}

export interface TrackingLinkSummary {
  id: string;
  publisherId: string;
  programId: string;
  slug: string;
  destinationUrl: string;
  clicks: number;
  conversions: number;
  createdAt: string;
}

export interface CommissionSummary {
  id: string;
  publisherId: string;
  programId: string;
  conversionId: string;
  amount: number;
  status: CommissionStatus;
  createdAt: string;
}

export interface DashboardKpi {
  label: string;
  value: number;
  delta?: number;
  format?: 'currency' | 'number' | 'percent';
}

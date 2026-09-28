export interface CreateAdvertiserRequest {
  companyName: string;
  website: string;
  industry?: string;
}

export interface Advertiser {
  _id: string;
  userId: string;
  companyName: string;
  website: string;
  industry?: string;
  logoUrl?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAdvertiserResponse {
  success: boolean;
  data: Advertiser;
  message: string;
}

export interface GetAdvertisersResponse {
  success: boolean;
  data: {
    items: Advertiser[];
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  message: string;
}

export interface GetAdvertiserResponse {
  success: boolean;
  data: Advertiser;
  message: string;
}

export interface UpdateAdvertiserRequest {
  companyName?: string;
  website?: string;
  industry?: string;
  logoUrl?: string;
}
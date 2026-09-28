export interface Publisher {
  _id: string;
  userId: string;
  website?: string;
  niche?: string;
  audienceSize?: number;
  payoutMethod?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePublisherRequest {
  website?: string;
  niche?: string;
  audienceSize?: number;
  payoutMethod?: string;
}

export interface CreatePublisherResponse {
  publisher: Publisher;
}
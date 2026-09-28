// =========================================================
// GUIDE
// =========================================================

export interface Guide {
  _id: string;
  category: string;
  title: string;
  description: string;
  readTime: string;
  icon: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// =========================================================
// CREATE GUIDE
// =========================================================

export interface CreateGuideRequest {
  category: string;
  title: string;
  description: string;
  readTime: string;
  icon: string;
  featured?: boolean;
}

export interface CreateGuideResponse {
  success: boolean;
  data: {
    guide: Guide;
  };
  message: string;
}

// =========================================================
// GET GUIDES
// =========================================================

export interface GetGuidesResponse {
  success: boolean;
  data: Guide[];
  message: string;
}

// =========================================================
// GET FEATURED GUIDES
// =========================================================

export interface GetFeaturedGuidesResponse {
  success: boolean;
  data: {
    guides: Guide[];
  };
  message: string;
}

// =========================================================
// GET GUIDE
// =========================================================

export interface GetGuideResponse {
  success: boolean;
  data: {
    guide: Guide;
  };
  message: string;
}

// =========================================================
// UPDATE GUIDE
// =========================================================

export interface UpdateGuideRequest {
  category?: string;
  title?: string;
  description?: string;
  readTime?: string;
  icon?: string;
  featured?: boolean;
}

export interface UpdateGuideResponse {
  success: boolean;
  data: {
    guide: Guide;
  };
  message: string;
}

// =========================================================
// DELETE GUIDE
// =========================================================

export interface DeleteGuideResponse {
  success: boolean;
  message: string;
}
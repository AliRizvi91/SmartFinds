import { baseApi } from '@/lib/api/baseApi';

import {
  CreatePublisherRequest,
  CreatePublisherResponse,
  Publisher,
} from '@packages/src/types/publisher.types';

export interface GetPublishersParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: 'asc' | 'desc';
}

export interface GetPublishersResponse {
  items: Publisher[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface UpdatePublisherRequest {
  id: string;
  website?: string;
  niche?: string;
  audienceSize?: number;
  payoutMethod?: string;
}

export const publishersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // CREATE PUBLISHER
    createPublisher: builder.mutation<
      CreatePublisherResponse,
      CreatePublisherRequest
    >({
      query: (body) => ({
        url: '/publishers',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Publishers'],
    }),

    // GET ALL PUBLISHERS
    getPublishers: builder.query<
      GetPublishersResponse,
      GetPublishersParams | undefined
    >({
      query: (params) => ({
        url: '/publishers',
        method: 'GET',
        params: params ?? {},
      }),
      providesTags: ['Publishers'],
    }),

    // GET SINGLE PUBLISHER
    getPublisher: builder.query<Publisher, string>({
      query: (id) => ({
        url: `/publishers/${id}`,
        method: 'GET',
      }),
      providesTags: ['Publishers'],
    }),

    // UPDATE PUBLISHER
    updatePublisher: builder.mutation<
      Publisher,
      UpdatePublisherRequest
    >({
      query: ({ id, ...body }) => ({
        url: `/publishers/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Publishers'],
    }),

    // DELETE PUBLISHER
    deletePublisher: builder.mutation<
      { __message: string },
      string
    >({
      query: (id) => ({
        url: `/publishers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Publishers'],
    }),
  }),
});

export const {
  useCreatePublisherMutation,
  useGetPublishersQuery,
  useGetPublisherQuery,
  useUpdatePublisherMutation,
  useDeletePublisherMutation,
} = publishersApi;
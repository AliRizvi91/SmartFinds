import { baseApi } from '@/lib/api/baseApi';
import { CreateAdvertiserRequest , Advertiser , CreateAdvertiserResponse } from '@packages/src/types/advertiser.types';


export const advertisersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAdvertiser: builder.mutation<
      CreateAdvertiserResponse,
      CreateAdvertiserRequest
    >({
      query: (body) => ({
        url: '/advertisers',
        method: 'POST',
        body,
      }
    ),
      invalidatesTags: ['Advertisers'],
    }
  ),

    getAdvertisers: builder.query({
      query: (params) => ({
        url: '/advertisers',
        method: 'GET',
        params,
      }),
      providesTags: ['Advertisers'],
    }),

    getAdvertiser: builder.query({
      query: (id: string) => ({
        url: `/advertisers/${id}`,
        method: 'GET',
      }),
      providesTags: ['Advertisers'],
    }),

    updateAdvertiser: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/advertisers/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Advertisers'],
    }),

    deleteAdvertiser: builder.mutation({
      query: (id: string) => ({
        url: `/advertisers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Advertisers'],
    }),
  }),
});

export const {
  useCreateAdvertiserMutation,
  useGetAdvertisersQuery,
  useGetAdvertiserQuery,
  useUpdateAdvertiserMutation,
  useDeleteAdvertiserMutation,
} = advertisersApi;
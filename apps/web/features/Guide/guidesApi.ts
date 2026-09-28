import { baseApi } from '@/lib/api/baseApi';

import type {
  Guide,
  CreateGuideRequest,
  CreateGuideResponse,
  GetGuidesResponse,
  GetFeaturedGuidesResponse,
  GetGuideResponse,
  UpdateGuideRequest,
  UpdateGuideResponse,
  DeleteGuideResponse,
} from '@packages/src/types/guide.types';

export const guidesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // =========================================================
    // CREATE GUIDE
    // =========================================================

    createGuide: builder.mutation<
      CreateGuideResponse,
      CreateGuideRequest
    >({
      query: (body) => ({
        url: '/guides',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Guides'],
    }),

    // =========================================================
    // GET ALL GUIDES
    // =========================================================

getGuides: builder.query<GetGuidesResponse, void>({
  query: () => ({
    url: '/guides',
    method: 'GET',
  }),
  providesTags: ['Guides'],
}),

    // =========================================================
    // GET FEATURED GUIDES
    // =========================================================

    getFeaturedGuides: builder.query<
      GetFeaturedGuidesResponse,
      void
    >({
      query: () => ({
        url: '/guides/featured',
        method: 'GET',
      }),
      providesTags: ['Guides'],
    }),

    // =========================================================
    // GET SINGLE GUIDE
    // =========================================================

    getGuide: builder.query<
      GetGuideResponse,
      string
    >({
      query: (id) => ({
        url: `/guides/${id}`,
        method: 'GET',
      }),
      providesTags: ['Guides'],
    }),

    // =========================================================
    // UPDATE GUIDE
    // =========================================================

    updateGuide: builder.mutation<
      UpdateGuideResponse,
      {
        id: string;
        body: UpdateGuideRequest;
      }
    >({
      query: ({ id, body }) => ({
        url: `/guides/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Guides'],
    }),

    // =========================================================
    // DELETE GUIDE
    // =========================================================

    deleteGuide: builder.mutation<
      DeleteGuideResponse,
      string
    >({
      query: (id) => ({
        url: `/guides/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Guides'],
    }),
  }),
});

export const {
  useCreateGuideMutation,
  useGetGuidesQuery,
  useGetFeaturedGuidesQuery,
  useGetGuideQuery,
  useUpdateGuideMutation,
  useDeleteGuideMutation,
} = guidesApi;
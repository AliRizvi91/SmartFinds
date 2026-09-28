import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',

  prepareHeaders: (headers) => {
    // IMPORTANT:
    // Content-Type manually set nahi karna.
    // Browser JSON/FormData ko khud handle karega.
    return headers;
  },
});

const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(
    args,
    api,
    extraOptions,
  );

  const url =
    typeof args === 'string'
      ? args
      : args.url;

  const isAuthEndpoint =
    url.includes('/auth/login') ||
    url.includes('/auth/verify-login-otp') ||
    url.includes('/auth/refresh');

  // Handle 401 only for protected endpoints
  if (
    result.error?.status === 401 &&
    !isAuthEndpoint
  ) {
    console.log(
      'Access token expired. Trying refresh...',
    );

    const refreshResult = await rawBaseQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      result = await rawBaseQuery(
        args,
        api,
        extraOptions,
      );
    }

    return result;
  }

  // Login/auth errors
  if (result.error) {
    console.error(
      'API Error:',
      result.error,
    );
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',

  baseQuery: baseQueryWithRefresh,

  tagTypes: [
    'Auth',
    'User',
    'Advertisers',
    'Publishers',
    'Advertiser',
    'Publishers',
    'Contacts',
    'Guides',
  ],

  endpoints: () => ({}),
});
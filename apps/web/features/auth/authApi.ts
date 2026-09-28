import { baseApi } from '@/lib/api/baseApi';

import type {
  AuthUser,
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  RefreshResponse,
  LogoutResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  VerifyLoginOtpRequest,
  VerifyLoginOtpResponse,
  ResendLoginOtpRequest,
  ResendLoginOtpResponse,
  UsersResponse
} from '@smartfinds/types/src/types/auth.types';

// =========================================================
// API RESPONSE TYPES
// =========================================================

interface MeResponse {
  success: boolean;
  data: AuthUser;
  message: string;
}

// =========================================================
// AUTH API
// =========================================================

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // =====================================================
    // REGISTER
    // =====================================================

    register: builder.mutation<
      RegisterResponse,
      RegisterRequest
    >({
      query: (data) => {
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('role', data.role);

        if (data.avatarUrl instanceof File) {
          formData.append('avatarUrl', data.avatarUrl);
        }

        return {
          url: '/auth/register',
          method: 'POST',
          body: formData,
        };
      },

      invalidatesTags: [
        'Auth',
        'User',
      ],
    }),

    // =====================================================
    // LOGIN
    // =====================================================

    login: builder.mutation<
      LoginResponse,
      LoginRequest
    >({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),

      invalidatesTags: [
        'Auth',
        'User',
      ],
    }),

    // =====================================================
    // VERIFY LOGIN OTP
    // =====================================================

    verifyLoginOtp: builder.mutation<
      VerifyLoginOtpResponse,
      VerifyLoginOtpRequest
    >({
      query: (body) => ({
        url: '/auth/login/verify-otp',
        method: 'POST',
        body,
      }),

      invalidatesTags: [
        'Auth',
        'User',
      ],
    }),

    // =====================================================
    // RESEND LOGIN OTP
    // =====================================================

    resendLoginOtp: builder.mutation<
      ResendLoginOtpResponse,
      ResendLoginOtpRequest
    >({
      query: (body) => ({
        url: '/auth/login/resend-otp',
        method: 'POST',
        body,
      }),
    }),

    // =====================================================
    // CURRENT USER
    // =====================================================

    me: builder.query<
      AuthUser,
      void
    >({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),

      transformResponse: (
        response: MeResponse,
      ) => response.data,

      providesTags: ['User'],
    }),

    // =====================================================
    // REFRESH TOKEN
    // =====================================================

    refresh: builder.mutation<
      RefreshResponse,
      void
    >({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
      }),

      invalidatesTags: [
        'Auth',
        'User',
      ],
    }),

    // =====================================================
    // LOGOUT
    // =====================================================

    logout: builder.mutation<
      LogoutResponse,
      void
    >({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),

      invalidatesTags: [
        'Auth',
        'User',
      ],
    }),

    // =====================================================
    // FORGOT PASSWORD
    // =====================================================

    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (body) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body,
      }),
    }),

    // =====================================================
    // RESET PASSWORD
    // =====================================================

    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: (body) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body,
      }),
    }),

    // =====================================================
    // VERIFY EMAIL
    // =====================================================

    verifyEmail: builder.mutation<
      VerifyEmailResponse,
      VerifyEmailRequest
    >({
      query: (body) => ({
        url: '/auth/verify-email',
        method: 'POST',
        body,
      }),

      invalidatesTags: [
        'User',
      ],
    }),

    // =====================================================
    // RESEND EMAIL VERIFICATION CODE
    // =====================================================

    resendEmailVerification: builder.mutation<
      ResendLoginOtpResponse,
      ForgotPasswordRequest
    >({
      query: (body) => ({
        url: '/auth/verify-email/resend',
        method: 'POST',
        body,
      }),
    }),

    getUsers: builder.query<AuthUser[], void>({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),

      transformResponse: (
        response: UsersResponse,
      ) => response.data,

      providesTags: ['User'],
    }),
  }),
});

// =========================================================
// HOOKS
// =========================================================

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyLoginOtpMutation,
  useResendLoginOtpMutation,
  useMeQuery,
  useRefreshMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useResendEmailVerificationMutation,
  useGetUsersQuery,
} = authApi;
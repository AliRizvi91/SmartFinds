import { UserRole } from '../..';



// =========================================================
// CURRENT USER
// =========================================================

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UsersResponse {
  success: boolean;
  data: AuthUser[];
  message: string;
}


// =========================================================
// REGISTER
// =========================================================

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatarUrl?: File;
}

export interface RegisterResponse {
  success: boolean;
  data: {
    user: AuthUser;
  };
  message: string;
}

// =========================================================
// LOGIN
// =========================================================
// NOTE: every backend response passes through a global interceptor that
// wraps the controller's return value as { success, data, message } — these
// types reflect that real wire shape, not just the service's return type.

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    requiresOtp: boolean;
    email: string;
    message: string;
  };
  message: string;
}


// =========================================================
// REFRESH
// =========================================================

export interface RefreshResponse {
  success: boolean;
  data: {
    user: AuthUser;
  };
  message: string;
}


// =========================================================
// LOGOUT
// =========================================================

export interface LogoutResponse {
  success: boolean;
  data: Record<string, never>;
  message: string;
}


// =========================================================
// FORGOT PASSWORD
// =========================================================

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  data: {
    message: string;
  };
  message: string;
}


// =========================================================
// RESET PASSWORD
// =========================================================

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  data: {
    message: string;
  };
  message: string;
}


// =========================================================
// VERIFY EMAIL
// =========================================================

export interface VerifyEmailRequest {
  email: string;
  otp: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  data: {
    user: AuthUser;
  };
  message: string;
}



// =========================================================
// LOGIN OTP
// =========================================================

export interface VerifyLoginOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyLoginOtpResponse {
  success: boolean;
  data: {
    user: AuthUser;
    message: string;
  };
  message: string;
}

export interface ResendLoginOtpRequest {
  email: string;
}

export interface ResendLoginOtpResponse {
  success: boolean;
  data: {
    message: string;
  };
  message: string;
}

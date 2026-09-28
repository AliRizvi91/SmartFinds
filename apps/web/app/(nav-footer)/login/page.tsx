'use client';

import { FormEvent, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';

import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from 'lucide-react';

import { toast } from 'sonner';

import { Container } from '@/components/ui/Container';
import { useLoginMutation } from '@/features/auth/authApi';

export default function LoginPage() {
  const router = useRouter();

  // =========================================================
  // STATE
  // =========================================================

  const [showPassword, setShowPassword] =
    useState(false);

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  // =========================================================
  // LOGIN API
  // =========================================================

  const [
    login,
    {
      isLoading,
      error
    },
  ] = useLoginMutation();

  // =========================================================
  // SUBMIT
  // =========================================================


// const [login, { isLoading, error }] =
//   useLoginMutation();


const handleSubmit = async (
  event: FormEvent<HTMLFormElement>,
) => {
  event.preventDefault();

  const normalizedEmail =
    email.trim().toLowerCase();

  // -------------------------------------------------------
  // Validation
  // -------------------------------------------------------

  if (!normalizedEmail) {
    toast.error(
      'Please enter your email address.',
    );
    return;
  }

  if (!password) {
    toast.error(
      'Please enter your password.',
    );
    return;
  }

  try {
    // -----------------------------------------------------
    // Login API
    // -----------------------------------------------------
const response = await login({
  email: normalizedEmail,
  password,
}).unwrap();

if (
  response.success &&
  response.data?.requiresOtp === true &&
  response.data?.email
) {
  toast.success('Verification code sent to your email.');

  router.push(
    `/login/verify?email=${encodeURIComponent(
      response.data.email,
    )}`,
  );

  return;
}

    toast.error(
      'Unable to continue login. Please try again.',
    );
  } catch (error: any) {
    console.error(
      'LOGIN ERROR:',
      error,
    );

    const message =
      error?.data?.message ||
      error?.message ||
      'Invalid email or password.';

    toast.error(
      Array.isArray(message)
        ? message[0]
        : message,
    );
  }
};

// =========================================================
// ERROR MESSAGE
// =========================================================

const getErrorMessage = (
  error: unknown,
): string => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'data' in error
  ) {
    const data = (
      error as {
        data?: {
          message?: string | string[];
        };
      }
    ).data;

    if (Array.isArray(data?.message)) {
      return data.message.join(', ');
    }

    if (data?.message) {
      return data.message;
    }
  }

  return 'Something went wrong. Please try again.';
};


  // =========================================================
  // UI
  // =========================================================

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#F7F6F2] px-0 py-16 sm:px-4">

      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-purple/10 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-purple/10 blur-3xl" />

      </div>

      {/* =====================================================
          LOGO
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: -10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="relative mb-8 text-center"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-display text-xl text-ink-text"
        >
          <Image
            src="https://res.cloudinary.com/dkbz23qyt/image/upload/v1789395841/Logo_e4qjnz.png"
            alt="SmartFinds"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />

          SmartFinds
        </Link>
      </motion.div>

      {/* =====================================================
          LOGIN CONTAINER
      ===================================================== */}

      <Container className="relative w-full sm:max-w-md">

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="rounded-3xl border border-neutral-200/80 bg-white p-7 shadow-[0_20px_60px_rgba(15,28,26,0.08)] sm:p-9"
        >

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mt-2">

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple">
              Welcome back
            </p>

            <h1 className="mt-2 font-display text-3xl text-ink-text">
              Sign in to your account
            </h1>

            <p className="mt-2 text-[15px] leading-6 text-neutral-500">
              Log in to continue managing your
              SmartFinds account.
            </p>

          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* ===============================================
                EMAIL
            =============================================== */}

            <div>

              <label
                htmlFor="email"
                className="text-sm font-medium text-ink-text"
              >
                Email address
              </label>

              <div className="relative mt-1.5">

                <Mail
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-neutral-400"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value,
                    )
                  }
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={isLoading}
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-white pl-12 pr-3.5 text-sm text-ink-text outline-none transition-all placeholder:text-neutral-400 focus:border-purple focus:ring-4 focus:ring-purple/10 disabled:cursor-not-allowed disabled:bg-neutral-50"
                />

              </div>

            </div>

            {/* ===============================================
                PASSWORD
            =============================================== */}

            <div>

              <div className="flex items-center justify-between">

                <label
                  htmlFor="password"
                  className="text-sm font-medium text-ink-text"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-purple transition-colors hover:text-purple-dark"
                >
                  Forgot password?
                </Link>

              </div>

              <div className="relative mt-1.5">

                <Lock
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-neutral-400"
                />

                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value,
                    )
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={isLoading}
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-white pl-12 pr-11 text-sm text-ink-text outline-none transition-all placeholder:text-neutral-400 focus:border-purple focus:ring-4 focus:ring-purple/10 disabled:cursor-not-allowed disabled:bg-neutral-50"
                />

                {/* Show / Hide Password */}

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (previous) =>
                        !previous,
                    )
                  }
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-purple disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label={
                    showPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>

              </div>

            </div>

            {/* ===============================================
                LOGIN BUTTON
            =============================================== */}

            <button
              type="submit"
              disabled={isLoading}
              className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-purple px-5 text-sm font-medium text-paper shadow-sm transition-all hover:bg-purple-dark hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >

              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-paper/30 border-t-paper" />

                  Checking...
                </>
              ) : (
                <>
                  Log in

                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}

            </button>

          </form>

          {/* =================================================
              REGISTER
          ================================================= */}

          <p className="mt-7 text-center text-sm text-neutral-500">

            Don&apos;t have an account?{' '}

            <Link
              href="/register"
              className="font-medium text-purple transition-colors hover:text-purple-dark"
            >
              Create one
            </Link>

          </p>
          {error && (
            <p className="text-sm text-red-500">
              {getErrorMessage(error)}
            </p>
          )}

          {/* =================================================
              LEGAL
          ================================================= */}

          <p className="mt-6 text-center text-[11px] leading-5 text-neutral-400">

            By continuing, you agree to our{' '}

            <Link
              href="/terms"
              className="underline underline-offset-2 hover:text-neutral-600"
            >
              Terms
            </Link>

            {' '}and{' '}

            <Link
              href="/privacy"
              className="underline underline-offset-2 hover:text-neutral-600"
            >
              Privacy Policy
            </Link>

            .

          </p>

        </motion.div>

      </Container>

    </main>
  );
}

'use client';

import Link from 'next/link';
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
} from 'lucide-react';
import { motion } from 'framer-motion';

import { useResetPasswordMutation } from '@/features/auth/authApi';

function ResetPasswordFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F6F2] px-4">
      <Container className="max-w-md">
        <div className="rounded-3xl border border-neutral-200/80 bg-white p-8 shadow-[0_20px_60px_rgba(15,28,26,0.08)]">
          <div className="mx-auto h-14 w-14 animate-pulse rounded-full bg-purple/10" />
          <div className="mx-auto mt-5 h-7 w-48 animate-pulse rounded bg-neutral-200" />
        </div>
      </Container>
    </main>
  );
}

function ResetPasswordForm() {
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const [password, setPassword] =
    useState('');

  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [
    resetPassword,
    {
      isLoading,
      isError,
      error,
      isSuccess,
    },
  ] = useResetPasswordMutation();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!token) return;

    if (password.length < 8) return;

    if (password !== confirmPassword) return;

    try {
      await resetPassword({
        token,
        newPassword: password,
      }).unwrap();
    } catch {
      // RTK Query error is handled below
    }
  };

  const getErrorMessage = () => {
    if (!isError) return '';

    if (
      error &&
      'data' in error &&
      error.data &&
      typeof error.data === 'object' &&
      'message' in error.data
    ) {
      const message = error.data.message;

      return Array.isArray(message)
        ? message.join(', ')
        : String(message);
    }

    return 'Invalid or expired reset link.';
  };

  const hasPasswordError =
    password.length > 0 &&
    password.length < 8;

  const hasConfirmError =
    confirmPassword.length > 0 &&
    password !== confirmPassword;

  // =========================================================
  // INVALID TOKEN
  // =========================================================

  if (!token) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F6F2] px-4">
        <Container className="max-w-md">
          <div className="rounded-3xl border border-neutral-200/80 bg-white p-8 text-center shadow-[0_20px_60px_rgba(15,28,26,0.08)]">
            <h1 className="font-display text-3xl text-ink-text">
              Invalid reset link
            </h1>

            <p className="mt-3 text-sm leading-6 text-neutral-500">
              This password reset link is invalid
              or incomplete.
            </p>

            <Link
              href="/forgot-password"
              className="mt-7 inline-flex h-11 items-center justify-center rounded-xl bg-purple px-6 text-sm font-medium text-paper hover:bg-purple-dark"
            >
              Request a new link
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  // =========================================================
  // SUCCESS
  // =========================================================

  if (isSuccess) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F6F2] px-4 py-16">
        <Container className="relative max-w-md">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-3xl border border-neutral-200/80 bg-white p-8 text-center shadow-[0_20px_60px_rgba(15,28,26,0.08)]"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-purple/10">
              <CheckCircle2 className="h-7 w-7 text-purple" />
            </div>

            <h1 className="mt-5 font-display text-3xl text-ink-text">
              Password reset
            </h1>

            <p className="mt-3 text-sm leading-6 text-neutral-500">
              Your password has been changed
              successfully.
            </p>

            <Link
              href="/login"
              className="mt-7 inline-flex h-11 items-center justify-center rounded-xl bg-purple px-6 text-sm font-medium text-paper transition-all hover:bg-purple-dark"
            >
              Continue to login
            </Link>
          </motion.div>
        </Container>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F6F2] px-4 py-16">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-purple/10 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-purple/10 blur-3xl" />
      </div>

      <Container className="relative max-w-md">
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
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 transition-colors hover:text-purple"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to login
          </Link>

          <div className="mt-7">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-purple">
              Account recovery
            </p>

            <h1 className="mt-2 text-center font-display text-3xl text-ink-text">
              Create new password
            </h1>

            <p className="mt-3 text-center text-sm leading-6 text-neutral-500">
              Choose a strong password for your
              SmartFinds account.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            {/* New password */}
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-ink-text"
              >
                New password
              </label>

              <div className="relative mt-1.5">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-neutral-400" />

                <input
                  id="password"
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-11 text-sm text-ink-text outline-none transition-all placeholder:text-neutral-400 focus:border-purple focus:ring-4 focus:ring-purple/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (value) => !value,
                    )
                  }
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-purple"
                  aria-label={
                    showPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {hasPasswordError && (
                <p className="mt-1.5 text-xs text-red-500">
                  Password must be at least 8
                  characters.
                </p>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-ink-text"
              >
                Confirm password
              </label>

              <div className="relative mt-1.5">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-neutral-400" />

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? 'text'
                      : 'password'
                  }
                  value={
                    confirmPassword
                  }
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value,
                    )
                  }
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-11 text-sm text-ink-text outline-none transition-all placeholder:text-neutral-400 focus:border-purple focus:ring-4 focus:ring-purple/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (value) => !value,
                    )
                  }
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-purple"
                  aria-label={
                    showConfirmPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {hasConfirmError && (
                <p className="mt-1.5 text-xs text-red-500">
                  Passwords do not match.
                </p>
              )}
            </div>

            {/* API error */}
            {isError && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm leading-5 text-red-600">
                {getErrorMessage()}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={
                isLoading ||
                password.length < 8 ||
                password !==
                  confirmPassword
              }
              className="flex h-11 w-full items-center justify-center rounded-xl bg-purple px-5 text-sm font-medium text-paper shadow-sm transition-all hover:bg-purple-dark hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading
                ? 'Resetting...'
                : 'Reset password'}
            </button>
          </form>
        </motion.div>
      </Container>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordFallback />}>
      <ResetPasswordForm />
    </Suspense>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Mail,
} from 'lucide-react';
import { motion } from 'framer-motion';

import { useForgotPasswordMutation } from '@/features/auth/authApi';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [
    forgotPassword,
    {
      isLoading,
      isError,
      error,
    },
  ] = useForgotPasswordMutation();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    try {
      await forgotPassword({
        email: email.trim().toLowerCase(),
      }).unwrap();

      setSubmitted(true);
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

    return 'Unable to send reset link. Please try again.';
  };

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
          {!submitted ? (
            <>
              {/* Header */}
              <div className="mt-8">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 transition-colors hover:text-purple"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to login
                </Link>

                <p className="mt-7 text-center text-xs font-semibold uppercase tracking-[0.18em] text-purple">
                  Account recovery
                </p>

                <h1 className="mt-2 text-center font-display text-3xl text-ink-text">
                  Forgot your password?
                </h1>

                <p className="mt-3 text-center text-sm leading-6 text-neutral-500">
                  Enter your email and we&apos;ll
                  send you a secure password reset
                  link.
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-ink-text"
                  >
                    Email address
                  </label>

                  <div className="relative mt-1.5">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-neutral-400" />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="h-11 w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-3.5 text-sm text-ink-text outline-none transition-all placeholder:text-neutral-400 focus:border-purple focus:ring-4 focus:ring-purple/10"
                    />
                  </div>
                </div>

                {/* Error */}
                {isError && (
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm leading-5 text-red-600">
                    {getErrorMessage()}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-purple px-5 text-sm font-medium text-paper shadow-sm transition-all hover:bg-purple-dark hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading
                    ? 'Sending...'
                    : 'Send reset link'}

                  {!isLoading && (
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  )}
                </button>
              </form>

              {/* Login */}
              <p className="mt-7 text-center text-sm text-neutral-500">
                Remember your password?{' '}
                <Link
                  href="/login"
                  className="font-medium text-purple transition-colors hover:text-purple-dark"
                >
                  Log in
                </Link>
              </p>

              {/* Security note */}
              <p className="mt-6 text-center text-[11px] leading-5 text-neutral-400">
                For your security, the password reset
                link will expire after 1 hour.
              </p>
            </>
          ) : (
            /* Success */
            <div className="py-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-purple/10">
                <CheckCircle2 className="h-7 w-7 text-purple" />
              </div>

              <h1 className="mt-5 font-display text-3xl text-ink-text">
                Check your email
              </h1>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                If an account exists for{' '}
                <span className="font-medium text-ink-text">
                  {email}
                </span>
                , we&apos;ve sent a password reset
                link.
              </p>

              <p className="mt-3 text-xs leading-5 text-neutral-400">
                The link will expire after 1 hour.
              </p>

              <Link
                href="/login"
                className="mt-7 inline-flex h-11 items-center justify-center rounded-xl bg-purple px-6 text-sm font-medium text-paper transition-all hover:bg-purple-dark"
              >
                Back to login
              </Link>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 block w-full text-sm font-medium text-purple hover:text-purple-dark"
              >
                Try another email
              </button>
            </div>
          )}
        </motion.div>
      </Container>
    </main>
  );
}

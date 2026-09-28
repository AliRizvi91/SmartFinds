'use client';

import {
  FormEvent,
  Suspense,
  useEffect,
  useState,
} from 'react';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  ArrowLeft,
  Mail,
} from 'lucide-react';

import {toast} from 'sonner';

import {
  useResendLoginOtpMutation,
  useVerifyLoginOtpMutation,
} from '@/features/auth/authApi';

import { Container } from '@/components/ui/Container';

function VerifyLoginFallback() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F6F2] px-4 py-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-purple/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-purple/10 blur-3xl" />
      </div>
      <Container className="relative w-full max-w-md">
        <div className="rounded-3xl border border-neutral-200/80 bg-white p-9 shadow-[0_20px_60px_rgba(15,28,26,0.08)]">
          <div className="h-12 w-12 animate-pulse rounded-2xl bg-purple/10" />
          <div className="mt-6 h-3 w-24 animate-pulse rounded bg-neutral-200" />
          <div className="mt-3 h-7 w-44 animate-pulse rounded bg-neutral-200" />
        </div>
      </Container>
    </main>
  );
}

function VerifyLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email =
    searchParams.get('email') || '';

  const [
    otp,
    setOtp,
  ] = useState('');

  const [
    verifyLoginOtp,
    {
      isLoading: isVerifying,
    },
  ] = useVerifyLoginOtpMutation();

  const [
    resendLoginOtp,
    {
      isLoading: isResending,
    },
  ] = useResendLoginOtpMutation();

  const [
    countdown,
    setCountdown,
  ] = useState(60);

  useEffect(() => {
    if (countdown <= 0) {
      return;
    }

    const timer =
      setInterval(() => {
        setCountdown(
          (prev) =>
            prev > 0
              ? prev - 1
              : 0,
        );
      }, 1000);

    return () =>
      clearInterval(timer);
  }, [countdown]);

  const handleSubmit = async (
    e: FormEvent,
  ) => {
    e.preventDefault();

    if (!email) {
      toast.error(
        'Email address is missing.',
      );

      router.push('/login');

      return;
    }

    if (otp.length !== 6) {
      toast.error(
        'Please enter the 6-digit code.',
      );

      return;
    }

    try {
      await verifyLoginOtp({
        email,
        otp,
      }).unwrap();

      toast.success(
        'Email verified successfully.',
      );

      router.push('/');
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          'Invalid verification code. Please try again.',
      );
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error(
        'Email address is missing.',
      );

      return;
    }

    try {
      await resendLoginOtp({
        email,
      }).unwrap();

      setOtp('');
      setCountdown(60);

      toast.success(
        'A new verification code has been sent.',
      );
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          'Unable to resend code.',
      );
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F6F2] px-4 py-16">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-purple/10 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-purple/10 blur-3xl" />
      </div>

      <Container className="relative w-full max-w-md">

        <div className="rounded-3xl border border-neutral-200/80 bg-white p-7 shadow-[0_20px_60px_rgba(15,28,26,0.08)] sm:p-9">

          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-purple"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>

          <div className="mt-8">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple/10 text-purple">
              <Mail className="h-6 w-6" />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-purple">
              Verify your email
            </p>

            <h1 className="mt-2 font-display text-3xl text-ink-text">
              Check your inbox
            </h1>

            <p className="mt-3 text-[15px] leading-6 text-neutral-500">
              We sent a 6-digit verification
              code to
              <span className="font-medium text-ink-text">
                {' '}
                {email}
              </span>
              .
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            <div>
              <label
                htmlFor="otp"
                className="text-sm font-medium text-ink-text"
              >
                Verification code
              </label>

              <input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value
                      .replace(
                        /\D/g,
                        '',
                      )
                      .slice(0, 6),
                  )
                }
                placeholder="000000"
                className="mt-1.5 h-14 w-full rounded-xl border border-neutral-200 bg-white text-center text-2xl font-semibold tracking-[0.5em] text-ink-text outline-none transition-all placeholder:text-neutral-300 focus:border-purple focus:ring-4 focus:ring-purple/10"
              />
            </div>

            <button
              type="submit"
              disabled={
                isVerifying ||
                otp.length !== 6
              }
              className="h-11 w-full rounded-xl bg-purple text-sm font-medium text-paper shadow-sm transition-all hover:bg-purple-dark hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isVerifying
                ? 'Verifying...'
                : 'Verify & continue'}
            </button>

          </form>

          <div className="mt-7 text-center">

            <p className="text-sm text-neutral-500">
              Didn&apos;t receive the code?
            </p>

            <button
              type="button"
              onClick={handleResend}
              disabled={
                isResending ||
                countdown > 0
              }
              className="mt-2 text-sm font-medium text-purple transition-colors hover:text-purple-dark disabled:cursor-not-allowed disabled:text-neutral-400"
            >
              {isResending
                ? 'Sending...'
                : countdown > 0
                  ? `Resend code in ${countdown}s`
                  : 'Resend email'}
            </button>

          </div>

          <p className="mt-7 text-center text-xs leading-5 text-neutral-400">
            The verification code expires
            after 10 minutes.
          </p>

        </div>

      </Container>
    </main>
  );
}

export default function VerifyLoginPage() {
  return (
    <Suspense fallback={<VerifyLoginFallback />}>
      <VerifyLoginForm />
    </Suspense>
  );
}
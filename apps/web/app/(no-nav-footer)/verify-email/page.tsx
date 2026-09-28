'use client';

import {
  FormEvent,
  Suspense,
  useEffect,
  useState,
} from 'react';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { ArrowLeft, BadgeCheck } from 'lucide-react';
import { toast } from 'sonner';

import {
  useResendEmailVerificationMutation,
  useVerifyEmailMutation,
} from '@/features/auth/authApi';

import { Container } from '@/components/ui/Container';

function VerifyEmailFallback() {
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

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get('email') || '';

  const [email, setEmail] = useState(emailFromQuery);
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(60);

  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [resendEmailVerification, { isLoading: isResending }] =
    useResendEmailVerificationMutation();

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Enter the email address you registered with.');
      return;
    }

    if (otp.length !== 6) {
      toast.error('Please enter the 6-digit code.');
      return;
    }

    try {
      await verifyEmail({ email, otp }).unwrap();
      toast.success('Email verified successfully.');
      router.push('/');
    } catch (error: any) {
      toast.error(
        error?.data?.message || 'Invalid verification code. Please try again.',
      );
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error('Enter the email address you registered with.');
      return;
    }

    try {
      await resendEmailVerification({ email }).unwrap();
      setOtp('');
      setCountdown(60);
      toast.success('A new verification code has been sent.');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Unable to resend code.');
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F6F2] px-4 py-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-purple/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-purple/10 blur-3xl" />
      </div>

      <Container className="relative w-full max-w-md">
        <div className="rounded-3xl border border-neutral-200/80 bg-white p-7 shadow-[0_20px_60px_rgba(15,28,26,0.08)] sm:p-9">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-purple"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="mt-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple/10 text-purple">
              <BadgeCheck className="h-6 w-6" />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-purple">
              Verify your email
            </p>

            <h1 className="mt-2 font-display text-3xl text-ink-text">
              Confirm your address
            </h1>

            <p className="mt-3 text-[15px] leading-6 text-neutral-500">
              {emailFromQuery
                ? (
                  <>
                    We sent a 6-digit verification code to
                    <span className="font-medium text-ink-text"> {emailFromQuery}</span>.
                  </>
                )
                : 'Enter your email and the 6-digit code we sent you.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {!emailFromQuery && (
              <div>
                <label htmlFor="email" className="text-sm font-medium text-ink-text">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="mt-1.5 w-full rounded-card border border-neutral-200 bg-white px-3.5 py-2.5 text-[15px] text-ink-text focus:border-purple focus:outline-none"
                />
              </div>
            )}

            <div>
              <label htmlFor="otp" className="text-sm font-medium text-ink-text">
                Verification code
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="123456"
                className="mt-1.5 w-full rounded-card border border-neutral-200 bg-white px-3.5 py-2.5 text-center text-[20px] tracking-[0.4em] text-ink-text focus:border-purple focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full rounded-card bg-purple px-5 py-3 text-[15px] font-medium text-paper transition-colors hover:bg-purple-dark disabled:opacity-60"
            >
              {isVerifying ? 'Verifying...' : 'Verify email'}
            </button>

            <button
              type="button"
              onClick={handleResend}
              disabled={isResending || countdown > 0}
              className="w-full text-center text-[13.5px] text-neutral-500 transition-colors hover:text-purple disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isResending
                ? 'Sending...'
                : countdown > 0
                  ? `Resend code in ${countdown}s`
                  : 'Resend email'}
            </button>
          </form>

          <p className="mt-7 text-center text-xs leading-5 text-neutral-400">
            The verification code expires after 10 minutes.
          </p>
        </div>
      </Container>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<VerifyEmailFallback />}>
      <VerifyEmailForm />
    </Suspense>
  );
}

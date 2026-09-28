'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  Hash,
  Users,
  Wallet,
} from 'lucide-react';
import { useState } from 'react';

import { useCreatePublisherMutation } from '@/features/publisher/publishersApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function RegisterPublisherPage() {
  const [formData, setFormData] = useState({
    website: '',
    niche: '',
    audienceSize: '',
    payoutMethod: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const router = useRouter();

  const [createPublisher, { isLoading }] =
    useCreatePublisherMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError('');
    }

    if (success) {
      setSuccess('');
    }
  };

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
) => {
  e.preventDefault();

  setError('');
  setSuccess('');

  if (!formData.website.trim()) {
    setError('Please enter your website.');
    return;
  }

  if (!formData.niche.trim()) {
    setError('Please enter your niche.');
    return;
  }

  if (
    formData.audienceSize &&
    Number(formData.audienceSize) < 0
  ) {
    setError('Audience size cannot be negative.');
    return;
  }

  const normalizedData = {
    website:
      formData.website.trim().startsWith('http://') ||
      formData.website.trim().startsWith('https://')
        ? formData.website.trim()
        : `https://${formData.website.trim()}`,

    niche: formData.niche.trim(),

    audienceSize: formData.audienceSize
      ? Number(formData.audienceSize)
      : undefined,

    payoutMethod: formData.payoutMethod || undefined,
  };

  try {
    await createPublisher(normalizedData).unwrap();

    setSuccess('Publisher profile created successfully.');

    setFormData({
      website: '',
      niche: '',
      audienceSize: '',
      payoutMethod: '',
    });


      toast.success('Publisher account created successfully!');
      router.push('/dashboard/publisher');
  } catch (err: any) {
      toast.error(
      error || 'Failed to create advertiser account',
    );
    const message = err?.data?.message;

    setError(
      Array.isArray(message)
        ? message.join(', ')
        : message ||
            'Unable to create publisher profile. Please try again.',
    );
  }
};

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7F6F2]">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-purple/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-[460px] w-[460px] rounded-full bg-sky-300/10 blur-3xl"
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-lg">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
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

          {/* Main card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
            className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,28,26,0.08)] sm:p-8"
          >

            {/* Back */}
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 text-xs font-medium text-neutral-400 transition-colors hover:text-purple"
            >
              <ArrowLeft
                size={14}
                className="transition-transform duration-200 group-hover:-translate-x-1"
              />

              Back to account type
            </Link>

            {/* Header */}
            <div className="mt-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple/10 text-purple">
                <Users
                  size={21}
                  strokeWidth={1.8}
                />
              </div>

              <span className="mt-5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-purple">
                Publisher account
              </span>

              <h1 className="mt-2 font-display text-3xl text-ink-text sm:text-4xl">
                Grow your audience
              </h1>

              <p className="mt-3 max-w-md text-sm leading-6 text-neutral-500">
                Tell us about your platform and audience so we
                can help you discover the right affiliate programs.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* Website */}
              <div>
                <label
                  htmlFor="website"
                  className="text-sm font-medium text-ink-text"
                >
                  Website
                </label>

                <div className="relative mt-1.5">
                  <Globe
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://yourwebsite.com"
                    autoComplete="url"
                    disabled={isLoading}
                    className="h-12 w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-3.5 text-sm text-ink-text outline-none transition-all placeholder:text-neutral-400 focus:border-purple focus:ring-4 focus:ring-purple/10 disabled:cursor-not-allowed disabled:bg-neutral-50"
                  />
                </div>
              </div>

              {/* Niche */}
              <div>
                <label
                  htmlFor="niche"
                  className="text-sm font-medium text-ink-text"
                >
                  Niche
                </label>

                <div className="relative mt-1.5">
                  <Hash
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    id="niche"
                    name="niche"
                    type="text"
                    value={formData.niche}
                    onChange={handleChange}
                    placeholder="Fashion, Technology, Fitness..."
                    disabled={isLoading}
                    className="h-12 w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-3.5 text-sm text-ink-text outline-none transition-all placeholder:text-neutral-400 focus:border-purple focus:ring-4 focus:ring-purple/10 disabled:cursor-not-allowed disabled:bg-neutral-50"
                  />
                </div>
              </div>

              {/* Audience Size */}
              <div>
                <label
                  htmlFor="audienceSize"
                  className="text-sm font-medium text-ink-text"
                >
                  Audience size
                </label>

                <div className="relative mt-1.5">
                  <Users
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    id="audienceSize"
                    name="audienceSize"
                    type="number"
                    min="0"
                    value={formData.audienceSize}
                    onChange={handleChange}
                    placeholder="e.g. 10000"
                    disabled={isLoading}
                    className="h-12 w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-3.5 text-sm text-ink-text outline-none transition-all placeholder:text-neutral-400 focus:border-purple focus:ring-4 focus:ring-purple/10 disabled:cursor-not-allowed disabled:bg-neutral-50"
                  />
                </div>

                <p className="mt-2 text-xs text-neutral-400">
                  Enter the approximate size of your audience.
                </p>
              </div>

              {/* Payout Method */}
              <div>
                <label
                  htmlFor="payoutMethod"
                  className="text-sm font-medium text-ink-text"
                >
                  Preferred payout method
                </label>

                <div className="relative mt-1.5">
                  <Wallet
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <select
                    id="payoutMethod"
                    name="payoutMethod"
                    value={formData.payoutMethod}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="h-12 w-full appearance-none rounded-xl border border-neutral-200 bg-white pl-10 pr-3.5 text-sm text-ink-text outline-none transition-all focus:border-purple focus:ring-4 focus:ring-purple/10 disabled:cursor-not-allowed disabled:bg-neutral-50"
                  >
                    <option value="">
                      Select payout method
                    </option>
                    <option value="bank_transfer">
                      Bank Transfer
                    </option>
                    <option value="paypal">
                      PayPal
                    </option>
                    <option value="payoneer">
                      Payoneer
                    </option>
                    <option value="other">
                      Other
                    </option>
                  </select>
                </div>
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {error}
                </motion.div>
              )}

              {/* Success */}
              {success && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-600"
                >
                  {success}
                </motion.div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-purple px-5 text-sm font-semibold text-white shadow-lg shadow-purple/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-dark hover:shadow-xl hover:shadow-purple/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {isLoading
                  ? 'Creating profile...'
                  : 'Create publisher profile'}

                {!isLoading && (
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}
              </button>
            </form>

            {/* Sign in */}
            <p className="mt-7 text-center text-sm text-neutral-500">
              Already have an account?{' '}

              <Link
                href="/login"
                className="font-medium text-purple transition-colors hover:text-purple-dark"
              >
                Sign in
              </Link>
            </p>
          </motion.div>

          {/* Terms */}
          <p className="mt-6 text-center text-xs leading-5 text-neutral-400">
            By creating a publisher profile, you agree to our{' '}

            <Link
              href="/terms"
              className="text-neutral-500 transition-colors hover:text-purple"
            >
              Terms of Service
            </Link>{' '}

            and{' '}

            <Link
              href="/privacy"
              className="text-neutral-500 transition-colors hover:text-purple"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}

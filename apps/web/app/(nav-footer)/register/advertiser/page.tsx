'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Globe,
  Tag,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

import { useCreateAdvertiserMutation } from '@/features/advertiser/advertisersApi';
import { createAdvertiserSchema } from '@/features/advertiser/advertiser.validator';
import { toast } from 'sonner';

export default function RegisterAdvertiserPage() {
  const router = useRouter();

  // =========================================================
  // FORM STATE
  // =========================================================

  const [formData, setFormData] = useState({
    companyName: '',
    website: '',
    industry: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');

  // =========================================================
  // API
  // =========================================================

  const [
    createAdvertiser,
    { isLoading },
  ] = useCreateAdvertiserMutation();

  // =========================================================
  // INPUT HANDLER
  // =========================================================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error while typing
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }

    // Clear server error
    if (serverError) {
      setServerError('');
    }
  };

  // =========================================================
  // SUBMIT
  // =========================================================

const onSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
) => {
  e.preventDefault();

  setErrors({});
  setServerError('');

  const normalizedData = {
    companyName: formData.companyName.trim(),
    website: formData.website.trim().startsWith('http://') ||
      formData.website.trim().startsWith('https://')
      ? formData.website.trim()
      : `https://${formData.website.trim()}`,
    industry: formData.industry.trim(),
  };

  const result =
    createAdvertiserSchema.safeParse(normalizedData);


  if (!result.success) {
    const fieldErrors: Record<string, string> = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0];

      if (
        typeof field === 'string' &&
        !fieldErrors[field]
      ) {
        fieldErrors[field] = issue.message;
      }
    });

    setErrors(fieldErrors);
    return;
  }

  try {
    const response =
      await createAdvertiser(result.data).unwrap();

    toast.success('Advertiser account created successfully!');
    router.push('/dashboard/advertiser');

    void response;
  } catch (error: any) {
    toast.error(
    error?.data?.message || 'Failed to create advertiser account',
  );

    const message =
      error?.data?.message ||
      'Unable to create advertiser account.';

    setServerError(
      Array.isArray(message)
        ? message.join(', ')
        : message,
    );
  }
};

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7F6F2]">
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-purple/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-[460px] w-[460px] rounded-full bg-sky-300/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/5 blur-3xl"
      />

      {/* =====================================================
          PAGE CONTAINER
      ===================================================== */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-lg">

          {/* =================================================
              LOGO
          ================================================= */}

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-display text-xl text-ink-text transition-opacity hover:opacity-80"
            >
              <Image
                src="https://res.cloudinary.com/dkbz23qyt/image/upload/v1789395841/Logo_e4qjnz.png"
                alt="SmartFinds logo"
                width={32}
                height={32}
                className="h-8 w-auto"
              />

              <span>SmartFinds</span>
            </Link>
          </motion.div>

          {/* =================================================
              MAIN CARD
          ================================================= */}

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
              duration: 0.6,
              ease: 'easeOut',
            }}
            className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,28,26,0.08)] sm:p-8"
          >

            {/* =============================================
                BACK LINK
            ============================================= */}

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

            {/* =============================================
                HEADER
            ============================================= */}

            <div className="mt-7">
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 0.15,
                  duration: 0.35,
                }}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple/10 text-purple"
              >
                <Building2
                  size={21}
                  strokeWidth={1.8}
                />
              </motion.div>

              <span className="mt-5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-purple">
                Advertiser account
              </span>

              <h1 className="mt-2 font-display text-3xl text-ink-text sm:text-4xl">
                Grow your brand
              </h1>

              <p className="mt-3 max-w-md text-sm leading-6 text-neutral-500">
                Set up your business profile and start
                building performance-driven affiliate
                partnerships.
              </p>
            </div>

            {/* =============================================
                SERVER ERROR
            ============================================= */}

            {serverError && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
                role="alert"
              >
                {serverError}
              </motion.div>
            )}

            {/* =============================================
                FORM
            ============================================= */}

            <form
              onSubmit={onSubmit}
              className="mt-8 space-y-5"
              noValidate
            >

              {/* ===========================================
                  COMPANY NAME
              =========================================== */}

              <div>
                <label
                  htmlFor="companyName"
                  className="text-sm font-medium text-ink-text"
                >
                  Company name
                </label>

                <div className="relative mt-1.5">
                  <Building2
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    autoComplete="organization"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Your company name"
                    disabled={isLoading}
                    aria-invalid={Boolean(
                      errors.companyName,
                    )}
                    aria-describedby={
                      errors.companyName
                        ? 'companyName-error'
                        : undefined
                    }
                    className={`h-12 w-full rounded-xl border bg-white pl-10 pr-3.5 text-sm text-ink-text outline-none transition-all placeholder:text-neutral-400 focus:ring-4 disabled:cursor-not-allowed disabled:bg-neutral-50 ${errors.companyName
                      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                      : 'border-neutral-200 focus:border-purple focus:ring-purple/10'
                      }`}
                  />
                </div>

                {errors.companyName && (
                  <p
                    id="companyName-error"
                    className="mt-1.5 text-xs text-red-500"
                  >
                    {errors.companyName}
                  </p>
                )}
              </div>

              {/* ===========================================
                  WEBSITE
              =========================================== */}

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
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    id="website"
                    name="website"
                    type="url"
                    inputMode="url"
                    autoComplete="url"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://yourcompany.com"
                    disabled={isLoading}
                    aria-invalid={Boolean(
                      errors.website,
                    )}
                    aria-describedby={
                      errors.website
                        ? 'website-error'
                        : undefined
                    }
                    className={`h-12 w-full rounded-xl border bg-white pl-10 pr-3.5 text-sm text-ink-text outline-none transition-all placeholder:text-neutral-400 focus:ring-4 disabled:cursor-not-allowed disabled:bg-neutral-50 ${errors.website
                      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                      : 'border-neutral-200 focus:border-purple focus:ring-purple/10'
                      }`}
                  />
                </div>

                {errors.website && (
                  <p
                    id="website-error"
                    className="mt-1.5 text-xs text-red-500"
                  >
                    {errors.website}
                  </p>
                )}
              </div>

              {/* ===========================================
                  INDUSTRY
              =========================================== */}

              <div>
                <label
                  htmlFor="industry"
                  className="text-sm font-medium text-ink-text"
                >
                  Industry{' '}
                  <span className="text-neutral-400">
                    (optional)
                  </span>
                </label>

                <div className="relative mt-1.5">
                  <Tag
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    id="industry"
                    name="industry"
                    type="text"
                    value={formData.industry}
                    onChange={handleChange}
                    placeholder="e.g. E-commerce, SaaS, Fashion"
                    disabled={isLoading}
                    aria-invalid={Boolean(
                      errors.industry,
                    )}
                    aria-describedby={
                      errors.industry
                        ? 'industry-error'
                        : undefined
                    }
                    className={`h-12 w-full rounded-xl border bg-white pl-10 pr-3.5 text-sm text-ink-text outline-none transition-all placeholder:text-neutral-400 focus:ring-4 disabled:cursor-not-allowed disabled:bg-neutral-50 ${errors.industry
                      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                      : 'border-neutral-200 focus:border-purple focus:ring-purple/10'
                      }`}
                  />
                </div>

                {errors.industry && (
                  <p
                    id="industry-error"
                    className="mt-1.5 text-xs text-red-500"
                  >
                    {errors.industry}
                  </p>
                )}
              </div>

              {/* ===========================================
                  INFO BOX
              =========================================== */}

              <div className="flex gap-3 rounded-xl border border-purple/10 bg-purple/[0.04] p-4">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-purple"
                />

                <div>
                  <p className="text-sm font-medium text-ink-text">
                    Your account is almost ready
                  </p>

                  <p className="mt-1 text-xs leading-5 text-neutral-500">
                    We&apos;ll connect this business profile
                    to your SmartFinds advertiser account.
                  </p>
                </div>
              </div>

              {/* ===========================================
                  SUBMIT BUTTON
              =========================================== */}

              <button
                type="submit"
                disabled={isLoading}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-purple px-5 text-sm font-semibold text-white shadow-lg shadow-purple/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-dark hover:shadow-xl hover:shadow-purple/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {isLoading ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />

                    Creating account...
                  </>
                ) : (
                  <>
                    Create advertiser account

                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* =============================================
                SIGN IN
            ============================================= */}

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

          {/* =================================================
              TERMS
          ================================================= */}

          <p className="mt-6 text-center text-xs leading-5 text-neutral-400">
            By creating an account, you agree to our{' '}

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
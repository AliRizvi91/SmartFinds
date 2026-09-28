'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  Eye,
  EyeOff,
  Loader2,
  Megaphone,
  UserPlus,
} from 'lucide-react';

import { useRegisterMutation } from '@/features/auth/authApi';
import { UserRole } from '@smartfinds/types';

type Role = 'ADVERTISER' | 'PUBLISHER';

export default function RegisterPage() {
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatarUrl, setavatarUrl] =
    useState<File | null>(null);

  const [profilePreview, setProfilePreview] =
    useState<string | null>(null);
  const [register, { isLoading }] =
    useRegisterMutation();

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'ADVERTISER' as Role,
  });

  const [error, setError] = useState('');

  const [success, setSuccess] = useState('');


  const handleavatarUrlChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Profile image must be less than 5MB.');
      return;
    }

    setError('');

    setavatarUrl(file);

    const previewUrl = URL.createObjectURL(file);
    setProfilePreview(previewUrl);
  };
  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError('');
    }
  };

  // =========================================================
  // ROLE CHANGE
  // =========================================================

  const handleRoleChange = (
    role: Role,
  ) => {
    setFormData((previous) => ({
      ...previous,
      role,
    }));

    if (error) {
      setError('');
    }
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    // -------------------------------------------------------
    // Client-side validation
    // -------------------------------------------------------

    const name =
      formData.name.trim();

    const email =
      formData.email.trim().toLowerCase();

    const password =
      formData.password;

    const confirmPassword =
      formData.confirmPassword;

    if (name.length < 2) {
      setError(
        'Name must be at least 2 characters.',
      );
      return;
    }

    if (!email) {
      setError(
        'Please enter your email address.',
      );
      return;
    }

    if (password.length < 8) {
      setError(
        'Password must be at least 8 characters.',
      );
      return;
    }

    if (password.length > 72) {
      setError(
        'Password must not exceed 72 characters.',
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        'Passwords do not match.',
      );
      return;
    }

    // -------------------------------------------------------
    // Register
    // -------------------------------------------------------

    try {
      const result = await register({
        name,
        email,
        password,
        role: formData.role as UserRole,
        avatarUrl: avatarUrl ?? undefined,
      }).unwrap();

      setSuccess('Account created successfully.');

      const role = result.data.user.role;

      switch (role) {
        case 'ADVERTISER':
          router.replace('/dashboard/advertiser');
          break;

        case 'PUBLISHER':
          router.replace('/dashboard/publisher');
          break;

        case 'ADMIN':
          router.replace('/dashboard/admin');
          break;

        default:
          console.error('Unknown user role:', role);
          setError('Unknown account role.');
      }
    } catch (err: any) {
      console.error(
        'Registration failed:',
        err,
      );

      const message =
        err?.data?.message;

      if (Array.isArray(message)) {
        setError(
          message.join(', '),
        );
        return;
      }

      setError(
        message ||
        'Unable to create your account. Please try again.',
      );
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7F6F2]">
      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-purple/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-[460px] w-[460px] rounded-full bg-sky-300/10 blur-3xl"
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-lg">

          {/* =================================================
              LOGO
          ================================================= */}

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
                className="h-8 w-auto"
              />

              SmartFinds
            </Link>
          </motion.div>

          {/* =================================================
              CARD
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
            {/* =================================================
                HEADING
            ================================================= */}

            <div className="text-center">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-purple">
                Get started
              </span>

              <h1 className="mt-3 font-display text-3xl text-ink-text sm:text-4xl">
                Create your account
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-neutral-500 ">
                Join SmartFinds and start building
                better partnerships.
              </p>
            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              <div className="mt-8 flex flex-col items-center">
                <div className="relative">

                  {/* Preview */}
                  <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-neutral-100 shadow-[0_8px_30px_rgba(15,28,26,0.12)] ring-1 ring-neutral-200">
                    {profilePreview ? (
                      <img
                        src={profilePreview}
                        alt="Profile preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-neutral-100">
                        <UserPlus
                          size={30}
                          strokeWidth={1.5}
                          className="text-neutral-400"
                        />
                      </div>
                    )}
                  </div>

                  {/* Upload button */}
                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    disabled={isLoading}
                    className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-ink-text text-white shadow-md transition-all duration-200 hover:bg-purple hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
                    aria-label="Upload profile image"
                  >
                    <span className="text-lg leading-none">
                      +
                    </span>
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleavatarUrlChange}
                    className="hidden"
                  />
                </div>

                <div className="mt-3 text-center">
                  <p className="text-sm font-medium text-ink-text">
                    Profile photo
                  </p>

                  <p className="mt-1 text-[11px] text-neutral-400">
                    JPG, PNG or WebP · Max 5MB
                  </p>
                </div>
              </div>
              {/* =================================================
                  NAME
              ================================================= */}

              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-ink-text"
                >
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  disabled={isLoading}
                  className="mt-1.5 h-11 w-full rounded-xl border border-neutral-200 bg-white px-3.5 text-sm text-ink-text outline-none transition placeholder:text-neutral-400 focus:border-purple focus:ring-2 focus:ring-purple/10 disabled:cursor-not-allowed disabled:bg-neutral-50"
                />
              </div>

              {/* =================================================
                  EMAIL
              ================================================= */}

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-ink-text"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={isLoading}
                  className="mt-1.5 h-11 w-full rounded-xl border border-neutral-200 bg-white px-3.5 text-sm text-ink-text outline-none transition placeholder:text-neutral-400 focus:border-purple focus:ring-2 focus:ring-purple/10 disabled:cursor-not-allowed disabled:bg-neutral-50"
                />
              </div>

              {/* =================================================
                  ACCOUNT TYPE
              ================================================= */}

              <div>
                <label className="text-sm font-medium text-ink-text">
                  Account type
                </label>

                <div className="mt-1.5 grid grid-cols-2 gap-3">

                  {/* Advertiser */}

                  <button
                    type="button"
                    onClick={() =>
                      handleRoleChange(
                        'ADVERTISER',
                      )
                    }
                    disabled={isLoading}
                    className={`group rounded-xl border p-3 text-left transition-all duration-200 ${formData.role ===
                      'ADVERTISER'
                      ? 'border-purple bg-purple/5 ring-2 ring-purple/10'
                      : 'border-neutral-200 hover:border-purple/40 hover:bg-neutral-50'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${formData.role ===
                          'ADVERTISER'
                          ? 'bg-purple/10 text-purple'
                          : 'bg-neutral-100 text-neutral-500'
                          }`}
                      >
                        <Megaphone
                          size={17}
                          strokeWidth={1.8}
                        />
                      </span>

                      <div>
                        <p className="text-sm font-medium text-ink-text">
                          Advertiser
                        </p>

                        <p className="mt-0.5 text-[11px] text-neutral-500">
                          Grow your brand
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Publisher */}

                  <button
                    type="button"
                    onClick={() =>
                      handleRoleChange(
                        'PUBLISHER',
                      )
                    }
                    disabled={isLoading}
                    className={`group rounded-xl border p-3 text-left transition-all duration-200 ${formData.role ===
                      'PUBLISHER'
                      ? 'border-purple bg-purple/5 ring-2 ring-purple/10'
                      : 'border-neutral-200 hover:border-purple/40 hover:bg-neutral-50'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${formData.role ===
                          'PUBLISHER'
                          ? 'bg-purple/10 text-purple'
                          : 'bg-neutral-100 text-neutral-500'
                          }`}
                      >
                        <BriefcaseBusiness
                          size={17}
                          strokeWidth={1.8}
                        />
                      </span>

                      <div>
                        <p className="text-sm font-medium text-ink-text">
                          Publisher
                        </p>

                        <p className="mt-0.5 text-[11px] text-neutral-500">
                          Monetize your audience
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* =================================================
                  PASSWORD
              ================================================= */}

              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-ink-text"
                >
                  Password
                </label>

                <div className="relative mt-1.5">
                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    disabled={isLoading}
                    className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-3.5 pr-11 text-sm text-ink-text outline-none transition placeholder:text-neutral-400 focus:border-purple focus:ring-2 focus:ring-purple/10 disabled:cursor-not-allowed disabled:bg-neutral-50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (value) => !value,
                      )
                    }
                    disabled={isLoading}
                    aria-label={
                      showPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 transition hover:text-purple"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                <p className="mt-1.5 text-[11px] text-neutral-400">
                  Use at least 8 characters.
                </p>
              </div>

              {/* =================================================
                  CONFIRM PASSWORD
              ================================================= */}

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-ink-text"
                >
                  Confirm password
                </label>

                <div className="relative mt-1.5">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? 'text'
                        : 'password'
                    }
                    value={
                      formData.confirmPassword
                    }
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    disabled={isLoading}
                    className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-3.5 pr-11 text-sm text-ink-text outline-none transition placeholder:text-neutral-400 focus:border-purple focus:ring-2 focus:ring-purple/10 disabled:cursor-not-allowed disabled:bg-neutral-50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (value) => !value,
                      )
                    }
                    disabled={isLoading}
                    aria-label={
                      showConfirmPassword
                        ? 'Hide confirm password'
                        : 'Show confirm password'
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 transition hover:text-purple"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* =================================================
                  ERROR
              ================================================= */}

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
                  className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-600"
                >
                  {error}
                </motion.div>
              )}

              {/* =================================================
                  SUCCESS
              ================================================= */}

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
                  className="rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-sm text-emerald-700"
                >
                  {success}
                </motion.div>
              )}

              {/* =================================================
                  REGISTER BUTTON
              ================================================= */}

              <motion.button
                whileHover={{
                  y: isLoading ? 0 : -1,
                }}
                whileTap={{
                  scale: isLoading ? 1 : 0.99,
                }}
                type="submit"
                disabled={isLoading}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-ink-text px-5 text-sm font-medium text-white transition-all duration-300 hover:bg-purple hover:shadow-lg hover:shadow-purple/15 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    Creating account...
                  </>
                ) : (
                  <>
                    <UserPlus
                      size={18}
                      strokeWidth={1.8}
                    />

                    Create account

                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </motion.button>
            </form>

            {/* =================================================
                LOGIN
            ================================================= */}

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
              FOOTER
          ================================================= */}

          <p className="mt-6 text-center text-xs leading-5 text-neutral-400">
            By continuing, you agree to our{' '}

            <Link
              href="/terms"
              className="text-neutral-500 hover:text-purple"
            >
              Terms of Service
            </Link>{' '}

            and{' '}

            <Link
              href="/privacy"
              className="text-neutral-500 hover:text-purple"
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
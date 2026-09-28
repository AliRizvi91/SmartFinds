'use client';

import Link from 'next/link';

import {
  Activity,
  ArrowRight,
  Users,
  MailCheck,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  UserCheck,
  UserPlus,
  XCircle,
} from 'lucide-react';

import {
  motion,
  useReducedMotion,
} from 'framer-motion';

import { useGetUsersQuery } from '@/features/auth/authApi';

import type {
  AuthUser,
} from '@smartfinds/types/src/types/auth.types';

// =========================================================
// TYPES & INTERFACES
// =========================================================

interface AnimationVariant {
  hidden: {
    opacity: number;
    y: number;
  };
  show: {
    opacity: number;
    y: number;
    transition: {
      duration: number;
    };
  };
}

interface StaggerVariant {
  hidden: Record<string, never>;
  show: {
    transition: {
      staggerChildren: number;
    };
  };
}

// =========================================================
// HELPERS
// =========================================================

function formatDate(date: Date | string): string {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Unknown';
  }

  return parsedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

// =========================================================
// PAGE
// =========================================================

export default function AdminDashboardPage() {
  const shouldReduceMotion = useReducedMotion();

  const {
    data: users = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetUsersQuery();

  // =======================================================
  // REAL BACKEND STATS
  // =======================================================

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.isActive,
  ).length;

  const inactiveUsers = users.filter(
    (user) => !user.isActive,
  ).length;

  const verifiedUsers = users.filter(
    (user) => user.isEmailVerified,
  ).length;

  const unverifiedUsers =
    totalUsers - verifiedUsers;

  const publishers = users.filter(
    (user) =>
      String(user.role).toUpperCase() ===
      'PUBLISHER',
  ).length;

  const advertisers = users.filter(
    (user) =>
      String(user.role).toUpperCase() ===
      'ADVERTISER',
  ).length;

  const admins = users.filter(
    (user) =>
      String(user.role).toUpperCase() ===
      'ADMIN',
  ).length;

  // =======================================================
  // RECENT USERS
  // =======================================================

  const recentUsers = [...users]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  // =======================================================
  // ANIMATION
  // =======================================================

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 18,
    },

    show: {
      opacity: 1,
      y: 0,

      transition: {
        duration: shouldReduceMotion ? 0 : 0.45,
      },
    },
  };

  const stagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion
          ? 0
          : 0.06,
      },
    },
  };

  // =======================================================
  // LOADING
  // =======================================================

  if (isLoading) {
    return (
      <main className="min-h-screen bg-paper px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1180px]">
          <div className="animate-pulse space-y-8">
            <div>
              <div className="h-8 w-56 rounded-lg bg-neutral-200" />
              <div className="mt-3 h-4 w-80 rounded bg-neutral-200" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="h-36 rounded-card bg-white"
                  />
                ),
              )}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
              <div className="h-[430px] rounded-card bg-white" />
              <div className="h-[430px] rounded-card bg-white" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // =======================================================
  // ERROR
  // =======================================================

  if (isError) {
    return (
      <main className="min-h-screen bg-paper px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[60vh] max-w-[1180px] items-center justify-center">
          <div className="w-full max-w-md rounded-card border border-red-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <XCircle size={26} />
            </div>

            <h2 className="mt-5 font-display text-2xl text-ink-text">
              Unable to load dashboard
            </h2>

            <p className="mt-2 text-sm leading-6 text-neutral-500">
              We could not retrieve users from the
              backend. Please try again.
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-ink px-5 text-sm font-semibold text-paper transition hover:-translate-y-0.5 hover:bg-ink-soft"
            >
              Try again
            </button>
          </div>
        </div>
      </main>
    );
  }

  // =======================================================
  // MAIN
  // =======================================================

  return (
    <main className="min-h-screen bg-paper px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1180px]">

        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="flex flex-col justify-between gap-5 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              System operational
            </div>

            <h1 className="font-display text-3xl tracking-tight text-ink-text sm:text-4xl">
              Admin overview
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
              Monitor your SmartFinds platform,
              users, account activity and verification
              status from one place.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isFetching && !isLoading && (
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-purple" />
                Updating
              </div>
            )}

<Link
  href="/dashboard/admin/users"
  className="group inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-4 text-sm font-semibold text-paper transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
>
  Manage Users
  <Users
    size={16}
    className="transition-transform duration-300 group-hover:translate-x-1"
  />
</Link>

<Link
  href="/dashboard/admin/contacts"
  className="group inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-4 text-sm font-semibold text-paper transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
>
  Manage Contacts
  <MailCheck
    size={16}
    className="transition-transform duration-300 group-hover:translate-x-1"
  />
</Link>

          </div>
        </motion.div>

        {/* =================================================
            KPI CARDS
        ================================================= */}

        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {/* TOTAL USERS */}

          <motion.div
            variants={fadeUp}
            className="group rounded-card border border-neutral-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple/10 text-purple">
                <Users size={21} />
              </div>

              <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                Total
              </span>
            </div>

            <div className="mt-6">
              <p className="text-xs font-medium text-neutral-500">
                Total users
              </p>

              <p className="mt-1 font-display text-3xl text-ink-text">
                {totalUsers}
              </p>
            </div>
          </motion.div>

          {/* ACTIVE USERS */}

          <motion.div
            variants={fadeUp}
            className="group rounded-card border border-neutral-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <UserCheck size={21} />
              </div>

              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
                Active
              </span>
            </div>

            <div className="mt-6">
              <p className="text-xs font-medium text-neutral-500">
                Active users
              </p>

              <p className="mt-1 font-display text-3xl text-ink-text">
                {activeUsers}
              </p>
            </div>
          </motion.div>

          {/* VERIFIED USERS */}

          <motion.div
            variants={fadeUp}
            className="group rounded-card border border-neutral-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky">
                <MailCheck size={21} />
              </div>

              <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-sky">
                Verified
              </span>
            </div>

            <div className="mt-6">
              <p className="text-xs font-medium text-neutral-500">
                Verified emails
              </p>

              <p className="mt-1 font-display text-3xl text-ink-text">
                {verifiedUsers}
              </p>
            </div>
          </motion.div>

          {/* PUBLISHERS */}

          <motion.div
            variants={fadeUp}
            className="group rounded-card border border-neutral-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold">
                <ShieldCheck size={21} />
              </div>

              <span className="rounded-full bg-gold/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-gold">
                Publisher
              </span>
            </div>

            <div className="mt-6">
              <p className="text-xs font-medium text-neutral-500">
                Publishers
              </p>

              <p className="mt-1 font-display text-3xl text-ink-text">
                {publishers}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.45fr_1fr]">

          {/* =================================================
              RECENT USERS
          ================================================= */}

          <motion.section
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="overflow-hidden rounded-card border border-neutral-200/80 bg-white shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-5 sm:px-6">
              <div>
                <h2 className="font-display text-xl text-ink-text">
                  Recent users
                </h2>

                <p className="mt-1 text-xs text-neutral-500">
                  Latest accounts created on the platform.
                </p>
              </div>

              <Link
                href="/dashboard/admin/users"
                className="group inline-flex items-center gap-1.5 text-xs font-semibold text-purple transition hover:text-purple-dark"
              >
                View all
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            {recentUsers.length === 0 ? (
              <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
                  <Users size={20} />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-ink-text">
                  No users yet
                </h3>

                <p className="mt-1 text-xs text-neutral-500">
                  New registered users will appear here.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-neutral-100">
                {recentUsers.map(
                  (user: AuthUser) => (
                    <div
                      key={user._id}
                      className="flex items-center gap-3 px-5 py-4 transition hover:bg-paper/60 sm:px-6"
                    >
                      {/* AVATAR */}

                      {user.avatarUrl ? (
                        <img
                          src={user.avatarUrl}
                          alt={user.name}
                          className="h-10 w-10 shrink-0 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-xs font-bold text-paper">
                          {getInitials(user.name)}
                        </div>
                      )}

                      {/* INFO */}

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-ink-text">
                          {user.name}
                        </p>

                        <p className="mt-0.5 truncate text-xs text-neutral-500">
                          {user.email}
                        </p>
                      </div>

                      {/* ROLE */}

                      <div className="hidden text-right sm:block">
                        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-600">
                          {String(user.role)}
                        </span>

                        <p className="mt-1 text-[10px] text-neutral-400">
                          {formatDate(user.createdAt)}
                        </p>
                      </div>

                      {/* STATUS */}

                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${
                          user.isActive
                            ? 'bg-emerald-500'
                            : 'bg-neutral-300'
                        }`}
                        title={
                          user.isActive
                            ? 'Active'
                            : 'Inactive'
                        }
                      />
                    </div>
                  ),
                )}
              </div>
            )}
          </motion.section>

          {/* =================================================
              ACCOUNT BREAKDOWN
          ================================================= */}

          <motion.section
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="rounded-card border border-neutral-200/80 bg-white p-5 shadow-sm sm:p-6"
          >
            <div>
              <h2 className="font-display text-xl text-ink-text">
                Account breakdown
              </h2>

              <p className="mt-1 text-xs text-neutral-500">
                Current user distribution.
              </p>
            </div>

            <div className="mt-7 space-y-6">

              {/* ACTIVE */}

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      size={15}
                      className="text-emerald-500"
                    />

                    <span className="text-sm font-medium text-ink-text">
                      Active accounts
                    </span>
                  </div>

                  <span className="text-sm font-semibold text-ink-text">
                    {activeUsers}
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                    style={{
                      width:
                        totalUsers > 0
                          ? `${(activeUsers / totalUsers) * 100}%`
                          : '0%',
                    }}
                  />
                </div>
              </div>

              {/* VERIFIED */}

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MailCheck
                      size={15}
                      className="text-sky"
                    />

                    <span className="text-sm font-medium text-ink-text">
                      Verified emails
                    </span>
                  </div>

                  <span className="text-sm font-semibold text-ink-text">
                    {verifiedUsers}
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="h-full rounded-full bg-sky transition-all duration-700"
                    style={{
                      width:
                        totalUsers > 0
                          ? `${(verifiedUsers / totalUsers) * 100}%`
                          : '0%',
                    }}
                  />
                </div>
              </div>

              {/* PUBLISHERS */}

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users
                      size={15}
                      className="text-purple"
                    />

                    <span className="text-sm font-medium text-ink-text">
                      Publishers
                    </span>
                  </div>

                  <span className="text-sm font-semibold text-ink-text">
                    {publishers}
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="h-full rounded-full bg-purple transition-all duration-700"
                    style={{
                      width:
                        totalUsers > 0
                          ? `${(publishers / totalUsers) * 100}%`
                          : '0%',
                    }}
                  />
                </div>
              </div>

              {/* ADVERTISERS */}

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity
                      size={15}
                      className="text-gold"
                    />

                    <span className="text-sm font-medium text-ink-text">
                      Advertisers
                    </span>
                  </div>

                  <span className="text-sm font-semibold text-ink-text">
                    {advertisers}
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="h-full rounded-full bg-gold transition-all duration-700"
                    style={{
                      width:
                        totalUsers > 0
                          ? `${(advertisers / totalUsers) * 100}%`
                          : '0%',
                    }}
                  />
                </div>
              </div>

            </div>

            {/* SUMMARY */}

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-paper p-4">
                <div className="flex items-center gap-2 text-neutral-400">
                  <UserPlus size={14} />

                  <span className="text-[10px] font-semibold uppercase tracking-wide">
                    Admins
                  </span>
                </div>

                <p className="mt-2 font-display text-2xl text-ink-text">
                  {admins}
                </p>
              </div>

              <div className="rounded-2xl bg-paper p-4">
                <div className="flex items-center gap-2 text-neutral-400">
                  <Clock3 size={14} />

                  <span className="text-[10px] font-semibold uppercase tracking-wide">
                    Unverified
                  </span>
                </div>

                <p className="mt-2 font-display text-2xl text-ink-text">
                  {unverifiedUsers}
                </p>
              </div>
            </div>
          </motion.section>
        </div>

        {/* =================================================
            FOOTER SUMMARY
        ================================================= */}

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-6 rounded-card border border-neutral-200/80 bg-ink p-6 text-paper shadow-sm sm:p-7"
        >
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-paper/50">
                Platform snapshot
              </p>

              <h3 className="mt-2 font-display text-2xl">
                {totalUsers} total accounts
              </h3>

              <p className="mt-1 text-sm text-paper/60">
                {activeUsers} active · {verifiedUsers}{' '}
                verified · {publishers} publishers ·{' '}
                {advertisers} advertisers
              </p>
            </div>

            <Link
              href="/dashboard/admin/users"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-paper px-5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Open users
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
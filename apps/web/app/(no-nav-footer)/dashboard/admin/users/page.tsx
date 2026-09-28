'use client';

import Link from 'next/link';

import {
  Check,
  ChevronLeft,
  ChevronRight,
  Mail,
  Search,
  ShieldCheck,
  UserCheck,
  UserPlus,
  Users,
  X,
  XCircle,
} from 'lucide-react';

import {
  motion,
  useReducedMotion,
} from 'framer-motion';

import {
  useMemo,
  useState,
} from 'react';

import { useGetUsersQuery } from '@/features/auth/authApi';

import type {
  AuthUser,
} from '@smartfinds/types/src/types/auth.types';

// =========================================================
// HELPERS
// =========================================================

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

function formatDate(date: Date | string) {
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

// =========================================================
// PAGE
// =========================================================

export default function AdminUsersPage() {
  const shouldReduceMotion = useReducedMotion();

  const {
    data: users = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetUsersQuery();

  const [search, setSearch] =
    useState('');

  const [roleFilter, setRoleFilter] =
    useState('ALL');

  const [statusFilter, setStatusFilter] =
    useState('ALL');

  const [page, setPage] =
    useState(1);

  const pageSize = 10;

  // =======================================================
  // FILTER USERS
  // =======================================================

  const filteredUsers = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return users.filter(
      (user) => {
        const matchesSearch =
          !normalizedSearch ||
          user.name
            .toLowerCase()
            .includes(normalizedSearch) ||
          user.email
            .toLowerCase()
            .includes(normalizedSearch);

        const matchesRole =
          roleFilter === 'ALL' ||
          String(user.role).toUpperCase() ===
            roleFilter;

        const matchesStatus =
          statusFilter === 'ALL' ||
          (statusFilter === 'ACTIVE' &&
            user.isActive) ||
          (statusFilter === 'INACTIVE' &&
            !user.isActive) ||
          (statusFilter === 'VERIFIED' &&
            user.isEmailVerified) ||
          (statusFilter === 'UNVERIFIED' &&
            !user.isEmailVerified);

        return (
          matchesSearch &&
          matchesRole &&
          matchesStatus
        );
      },
    );
  }, [
    users,
    search,
    roleFilter,
    statusFilter,
  ]);

  // =======================================================
  // PAGINATION
  // =======================================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredUsers.length / pageSize,
    ),
  );

  const safePage = Math.min(
    page,
    totalPages,
  );

  const paginatedUsers =
    filteredUsers.slice(
      (safePage - 1) * pageSize,
      safePage * pageSize,
    );

  // =======================================================
  // STATS
  // =======================================================

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.isActive,
  ).length;

  const verifiedUsers = users.filter(
    (user) => user.isEmailVerified,
  ).length;

  const publishers = users.filter(
    (user) =>
      String(user.role).toUpperCase() ===
      'PUBLISHER',
  ).length;

  // =======================================================
  // FILTER HANDLERS
  // =======================================================

  function updateSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  function updateRole(value: string) {
    setRoleFilter(value);
    setPage(1);
  }

  function updateStatus(value: string) {
    setStatusFilter(value);
    setPage(1);
  }

  function clearFilters() {
    setSearch('');
    setRoleFilter('ALL');
    setStatusFilter('ALL');
    setPage(1);
  }

  // =======================================================
  // ANIMATION
  // =======================================================

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 16,
    },

    show: {
      opacity: 1,
      y: 0,

      transition: {
        duration: shouldReduceMotion ? 0 : 0.4,
      },
    },
  };

  // =======================================================
  // LOADING
  // =======================================================

  if (isLoading) {
    return (
      <main className="min-h-screen bg-paper px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1180px] animate-pulse">
          <div className="h-8 w-48 rounded-lg bg-neutral-200" />

          <div className="mt-3 h-4 w-80 rounded bg-neutral-200" />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="h-28 rounded-card bg-white"
                />
              ),
            )}
          </div>

          <div className="mt-6 h-[600px] rounded-card bg-white" />
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
              Unable to load users
            </h2>

            <p className="mt-2 text-sm leading-6 text-neutral-500">
              There was a problem fetching users from
              the backend.
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-ink px-5 text-sm font-semibold text-paper transition hover:-translate-y-0.5"
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
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple/10 bg-purple/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-purple">
              <Users size={13} />
              User management
            </div>

            <h1 className="font-display text-3xl tracking-tight text-ink-text sm:text-4xl">
              Users
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
              Manage and monitor all accounts registered
              on the SmartFinds platform.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isFetching && (
              <span className="text-xs text-neutral-400">
                Updating...
              </span>
            )}

            <Link
              href="/dashboard/admin"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 text-sm font-semibold text-ink-text transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Overview
            </Link>
          </div>
        </motion.div>

        {/* =================================================
            STATS
        ================================================= */}

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* TOTAL */}

          <div className="rounded-card border border-neutral-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple/10 text-purple">
                <Users size={19} />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
                Total
              </span>
            </div>

            <p className="mt-5 text-xs text-neutral-500">
              All users
            </p>

            <p className="mt-1 font-display text-3xl text-ink-text">
              {totalUsers}
            </p>
          </div>

          {/* ACTIVE */}

          <div className="rounded-card border border-neutral-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <UserCheck size={19} />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
                Active
              </span>
            </div>

            <p className="mt-5 text-xs text-neutral-500">
              Active accounts
            </p>

            <p className="mt-1 font-display text-3xl text-ink-text">
              {activeUsers}
            </p>
          </div>

          {/* VERIFIED */}

          <div className="rounded-card border border-neutral-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky">
                <Mail size={19} />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-wide text-sky">
                Verified
              </span>
            </div>

            <p className="mt-5 text-xs text-neutral-500">
              Verified emails
            </p>

            <p className="mt-1 font-display text-3xl text-ink-text">
              {verifiedUsers}
            </p>
          </div>

          {/* PUBLISHERS */}

          <div className="rounded-card border border-neutral-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold">
                <UserPlus size={19} />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-wide text-gold">
                Publisher
              </span>
            </div>

            <p className="mt-5 text-xs text-neutral-500">
              Publisher accounts
            </p>

            <p className="mt-1 font-display text-3xl text-ink-text">
              {publishers}
            </p>
          </div>
        </motion.div>

        {/* =================================================
            FILTER BAR
        ================================================= */}

        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-6 rounded-card border border-neutral-200/80 bg-white p-4 shadow-sm sm:p-5"
        >
          <div className="flex flex-col gap-3 lg:flex-row">

            {/* SEARCH */}

            <div className="relative min-w-0 flex-1">
              <Search
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                value={search}
                onChange={(event) =>
                  updateSearch(event.target.value)
                }
                placeholder="Search by name or email..."
                className="h-11 w-full rounded-xl border border-neutral-200 bg-paper pl-11 pr-10 text-sm text-ink-text outline-none transition placeholder:text-neutral-400 focus:border-purple/40 focus:ring-4 focus:ring-purple/5"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => updateSearch('')}
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-100 hover:text-ink-text"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* ROLE */}

            <select
              value={roleFilter}
              onChange={(event) =>
                updateRole(event.target.value)
              }
              className="h-11 rounded-xl border border-neutral-200 bg-paper px-4 text-sm text-ink-text outline-none transition focus:border-purple/40 focus:ring-4 focus:ring-purple/5"
            >
              <option value="ALL">
                All roles
              </option>

              <option value="ADMIN">
                Admin
              </option>

              <option value="ADVERTISER">
                Advertiser
              </option>

              <option value="PUBLISHER">
                Publisher
              </option>
            </select>

            {/* STATUS */}

            <select
              value={statusFilter}
              onChange={(event) =>
                updateStatus(event.target.value)
              }
              className="h-11 rounded-xl border border-neutral-200 bg-paper px-4 text-sm text-ink-text outline-none transition focus:border-purple/40 focus:ring-4 focus:ring-purple/5"
            >
              <option value="ALL">
                All status
              </option>

              <option value="ACTIVE">
                Active
              </option>

              <option value="INACTIVE">
                Inactive
              </option>

              <option value="VERIFIED">
                Verified
              </option>

              <option value="UNVERIFIED">
                Unverified
              </option>
            </select>

            {(search ||
              roleFilter !== 'ALL' ||
              statusFilter !== 'ALL') && (
              <button
                type="button"
                onClick={clearFilters}
                className="h-11 rounded-xl border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-600 transition hover:bg-neutral-50"
              >
                Clear
              </button>
            )}
          </div>

          <div className="mt-4 flex flex-col justify-between gap-2 border-t border-neutral-100 pt-4 text-xs text-neutral-400 sm:flex-row">
            <span>
              Showing{' '}
              <strong className="font-semibold text-ink-text">
                {filteredUsers.length}
              </strong>{' '}
              matching users
            </span>

            <span>
              {totalUsers} total accounts
            </span>
          </div>
        </motion.section>

        {/* =================================================
            USERS TABLE
        ================================================= */}

        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-6 overflow-hidden rounded-card border border-neutral-200/80 bg-white shadow-sm"
        >
          {paginatedUsers.length === 0 ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
                <Search size={22} />
              </div>

              <h3 className="mt-5 font-display text-xl text-ink-text">
                No users found
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
                No accounts match your current search
                and filter settings.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition hover:-translate-y-0.5"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {/* DESKTOP TABLE */}

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="border-b border-neutral-100 bg-paper/60">
                      <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                        User
                      </th>

                      <th className="px-4 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                        Role
                      </th>

                      <th className="px-4 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                        Status
                      </th>

                      <th className="px-4 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                        Email
                      </th>

                      <th className="px-6 py-4 text-right text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                        Joined
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-neutral-100">
                    {paginatedUsers.map(
                      (user: AuthUser) => (
                        <tr
                          key={user._id}
                          className="group transition hover:bg-paper/60"
                        >
                          {/* USER */}

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {user.avatarUrl ? (
                                <img
                                  src={user.avatarUrl}
                                  alt={user.name}
                                  className="h-10 w-10 rounded-xl object-cover"
                                />
                              ) : (
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-xs font-bold text-paper">
                                  {getInitials(
                                    user.name,
                                  )}
                                </div>
                              )}

                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-ink-text">
                                  {user.name}
                                </p>

                                <p className="mt-0.5 max-w-[220px] truncate text-xs text-neutral-500">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* ROLE */}

                          <td className="px-4 py-4">
                            <span className="inline-flex rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-600">
                              {String(
                                user.role,
                              )}
                            </span>
                          </td>

                          {/* STATUS */}

                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <span
                                className={`h-2 w-2 rounded-full ${
                                  user.isActive
                                    ? 'bg-emerald-500'
                                    : 'bg-neutral-300'
                                }`}
                              />

                              <span
                                className={`text-xs font-medium ${
                                  user.isActive
                                    ? 'text-emerald-600'
                                    : 'text-neutral-400'
                                }`}
                              >
                                {user.isActive
                                  ? 'Active'
                                  : 'Inactive'}
                              </span>
                            </div>
                          </td>

                          {/* EMAIL */}

                          <td className="px-4 py-4">
                            {user.isEmailVerified ? (
                              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                                <Check size={14} />
                                Verified
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-600">
                                <Mail size={14} />
                                Unverified
                              </span>
                            )}
                          </td>

                          {/* DATE */}

                          <td className="px-6 py-4 text-right">
                            <span className="text-xs text-neutral-500">
                              {formatDate(
                                user.createdAt,
                              )}
                            </span>
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>

              {/* MOBILE CARDS */}

              <div className="divide-y divide-neutral-100 md:hidden">
                {paginatedUsers.map(
                  (user: AuthUser) => (
                    <div
                      key={user._id}
                      className="p-5"
                    >
                      <div className="flex items-start gap-3">
                        {user.avatarUrl ? (
                          <img
                            src={user.avatarUrl}
                            alt={user.name}
                            className="h-11 w-11 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink text-xs font-bold text-paper">
                            {getInitials(
                              user.name,
                            )}
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-ink-text">
                            {user.name}
                          </p>

                          <p className="mt-1 truncate text-xs text-neutral-500">
                            {user.email}
                          </p>

                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-600">
                              {String(
                                user.role,
                              )}
                            </span>

                            <span
                              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                                user.isActive
                                  ? 'bg-emerald-50 text-emerald-600'
                                  : 'bg-neutral-100 text-neutral-400'
                              }`}
                            >
                              {user.isActive
                                ? 'Active'
                                : 'Inactive'}
                            </span>

                            <span
                              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                                user.isEmailVerified
                                  ? 'bg-sky-50 text-sky'
                                  : 'bg-amber-50 text-amber-600'
                              }`}
                            >
                              {user.isEmailVerified
                                ? 'Verified'
                                : 'Unverified'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
                        <span className="text-[11px] text-neutral-400">
                          Joined{' '}
                          {formatDate(
                            user.createdAt,
                          )}
                        </span>

                        <span className="flex items-center gap-1 text-[11px] text-neutral-400">
                          <ShieldCheck size={13} />
                          Account
                        </span>
                      </div>
                    </div>
                  ),
                )}
              </div>

              {/* =================================================
                  PAGINATION
              ================================================= */}

              <div className="flex flex-col gap-3 border-t border-neutral-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <p className="text-xs text-neutral-400">
                  Page{' '}
                  <span className="font-semibold text-ink-text">
                    {safePage}
                  </span>{' '}
                  of{' '}
                  <span className="font-semibold text-ink-text">
                    {totalPages}
                  </span>
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={safePage <= 1}
                    onClick={() =>
                      setPage(
                        (current) =>
                          Math.max(
                            1,
                            current - 1,
                          ),
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-500 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <button
                    type="button"
                    disabled={
                      safePage >= totalPages
                    }
                    onClick={() =>
                      setPage(
                        (current) =>
                          Math.min(
                            totalPages,
                            current + 1,
                          ),
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-500 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Next page"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.section>
      </div>
    </main>
  );
}
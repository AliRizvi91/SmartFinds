'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type Role = 'advertiser' | 'publisher' | 'admin';

type NavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  key: string;
};

const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  advertiser: [
    {
      href: '/dashboard/advertiser',
      label: 'Overview',
      icon: LayoutDashboard,
      key: 'overview',
    },
  ],

  publisher: [
    {
      href: '/dashboard/publisher',
      label: 'Overview',
      icon: LayoutDashboard,
      key: 'overview',
    },
  ],

  admin: [
    {
      href: '/dashboard/admin',
      label: 'Overview',
      icon: LayoutDashboard,
      key: 'overview',
    },
    {
      href: '/dashboard/admin/users',
      label: 'Users',
      icon: Users,
      key: 'users',
    },
  ],
};

export function DashboardShell({
  role,
  active,
  children,
}: {
  role: Role;
  active: string;
  children: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const nav = NAV_BY_ROLE[role];

  const pageVariants = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 10,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="min-h-screen bg-paper font-sans text-ink-text">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[250px] border-r border-neutral-200 bg-white md:flex md:flex-col">
        {/* Brand */}
        <div className="flex h-[76px] items-center border-b border-neutral-200 px-6">
          <Link
            href="/"
            className="group flex items-center gap-2"
          >
            <span className="font-display text-[22px] text-ink-text">
              smartfinds
            </span>

            <span className="rounded-full bg-purple/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-purple">
              Admin
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 py-6">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Workspace
          </p>

          <nav className="mt-3 space-y-1.5">
            {nav.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.key;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative block"
                >
                  {isActive && (
                    <motion.div
                      layoutId="admin-active-nav"
                      className="absolute inset-0 rounded-card bg-purple/10"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}

                  <div
                    className={clsx(
                      'relative flex items-center gap-3 rounded-card px-3.5 py-3 text-[14px] transition-all duration-200',
                      isActive
                        ? 'font-medium text-purple'
                        : 'text-ink-text/65 hover:bg-neutral-200/40 hover:text-ink-text',
                    )}
                  >
                    <Icon
                      size={18}
                      strokeWidth={isActive ? 2.2 : 1.8}
                    />

                    <span>{item.label}</span>

                    {isActive && (
                      <motion.span
                        layoutId="admin-active-dot"
                        className="ml-auto h-1.5 w-1.5 rounded-full bg-purple"
                      />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Admin Card */}
        <div className="p-4">
          <div className="relative overflow-hidden rounded-card border border-neutral-200 bg-paper p-4">
            <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-purple/10 blur-2xl" />

            <div className="relative flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white">
                <ShieldCheck size={17} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-ink-text">
                  Administrator
                </p>
                <p className="mt-0.5 text-[11px] text-neutral-500">
                  Platform access
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm md:hidden"
            />

            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-neutral-200 bg-white md:hidden"
            >
              <div className="flex h-[76px] items-center justify-between border-b border-neutral-200 px-5">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-xl text-ink-text"
                >
                  smartfinds
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-ink-text"
                  aria-label="Close menu"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="flex-1 px-4 py-6">
                <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  Workspace
                </p>

                <nav className="mt-3 space-y-1.5">
                  {nav.map((item) => {
                    const Icon = item.icon;
                    const isActive = active === item.key;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={clsx(
                          'flex items-center gap-3 rounded-card px-3.5 py-3 text-[14px] transition',
                          isActive
                            ? 'bg-purple/10 font-medium text-purple'
                            : 'text-ink-text/65 hover:bg-neutral-100 hover:text-ink-text',
                        )}
                      >
                        <Icon size={18} />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="p-4">
                <div className="rounded-card border border-neutral-200 bg-paper p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white">
                      <ShieldCheck size={17} />
                    </div>

                    <div>
                      <p className="text-[13px] font-medium text-ink-text">
                        Administrator
                      </p>
                      <p className="text-[11px] text-neutral-500">
                        Platform access
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Area */}
      <div className="min-h-screen md:pl-[250px]">
        {/* Mobile Header */}
        <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-neutral-200 bg-white/90 px-5 backdrop-blur-xl md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-text transition hover:bg-neutral-100"
            aria-label="Open menu"
          >
            <Menu size={21} />
          </button>

          <Link
            href="/"
            className="font-display text-xl text-ink-text"
          >
            smartfinds
          </Link>

          <div className="h-9 w-9" />
        </header>

        <motion.main
          variants={pageVariants}
          initial="initial"
          animate="animate"
          className="min-h-[calc(100vh-68px)]"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
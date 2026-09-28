"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import {
  useMeQuery,
  useLogoutMutation,
} from "@/features/auth/authApi";

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const {
    data: User,
    isLoading,
  } = useMeQuery();

  const user = User ? User : null;

  const [logout, { isLoading: isLoggingOut }] =
    useLogoutMutation();

  // =========================================================
  // Close dropdown when clicking outside
  // =========================================================

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // =========================================================
  // Close dropdown with Escape
  // =========================================================

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  // =========================================================
  // Logout
  // =========================================================

  const handleLogout = async () => {
    try {
      await logout().unwrap();

      setOpen(false);
    } catch (error) {
      console.error(
        "Logout failed:",
        error
      );
    }
  };

  // =========================================================
  // Loading
  // =========================================================

  if (isLoading) {
    return null;
  }

  // =========================================================
  // Not authenticated
  // =========================================================

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/register"
          className="rounded-full bg-purple px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-purple-dark"
        >
          Get started
        </Link>
      </div>
    );
  }

  // =========================================================
  // ADMIN ONLY Dashboard
  // =========================================================

  const dashboardPath =
    user.role === "ADMIN"
      ? "/dashboard/admin"
      : null;

  // =========================================================
  // User initials
  // =========================================================

  const initials = user.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      ref={menuRef}
      className="relative"
    >
      {/* =====================================================
          MOBILE
          Dashboard ONLY for ADMIN
          ===================================================== */}

      <div className="block md:hidden">
        {user.role === "ADMIN" &&
          dashboardPath && (
            <motion.div
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={dashboardPath}
                className="flex items-center gap-2 rounded-full bg-purple px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-dark"
              >
                <LayoutDashboard size={17} />

                <span>
                  Dashboard
                </span>
              </Link>
            </motion.div>
          )}
      </div>

      {/* =====================================================
          DESKTOP
          Avatar + Dropdown
          ===================================================== */}

      <div className="hidden md:block">
        {/* Avatar Button */}

        <motion.button
          type="button"
          onClick={() =>
            setOpen((value) => !value)
          }
          whileTap={{ scale: 0.94 }}
          className="group flex items-center rounded-full border border-white/10 bg-white/10 p-1 transition-colors hover:bg-white/15"
          aria-label="Open user menu"
          aria-expanded={open}
        >
          {/* Avatar */}

          <div className="relative h-9 w-9 overflow-hidden rounded-full bg-purple">
            {user.avatarUrl ? (
              <Image
                src={user.avatarUrl}
                alt={user.name}
                fill
                sizes="36px"
                className="object-cover"
              />
            ) : (
              <Image
                src="https://res.cloudinary.com/dkbz23qyt/image/upload/v1790426996/Avatar_knh289.png"
                alt={user.name}
                fill
                sizes="36px"
                className="object-cover"
              />
            )}
          </div>
        </motion.button>

        {/* =================================================
            Desktop Dropdown
            ================================================= */}

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                y: -8,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -8,
                scale: 0.96,
              }}
              transition={{
                duration: 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute right-[-2rem] top-[calc(100%+10px)] z-[100] w-72 origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-[#0F1C1A] p-2 shadow-2xl backdrop-blur-xl"
            >
              {/* =================================================
                  User Info
                  ================================================= */}

              <div className="mb-1 flex items-center gap-3 rounded-xl px-3 py-3">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-purple/70">
                  {user.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt={user.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
                      {initials || "U"}
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {user.name}
                  </p>

                  <p className="truncate text-xs text-white/50">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="my-1 h-px bg-white/10" />

              {/* =================================================
                  Dashboard
                  ADMIN ONLY
                  ================================================= */}

              {user.role === "ADMIN" &&
                dashboardPath && (
                  <MenuItem
                    href={dashboardPath}
                    icon={
                      <LayoutDashboard size={17} />
                    }
                    label="Dashboard"
                    onClick={() =>
                      setOpen(false)
                    }
                  />
                )}

              {/* =================================================
                  Logout
                  ================================================= */}

              <div className="my-1 h-px bg-white/10" />

              <motion.button
                type="button"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-purple-300 transition-colors hover:bg-purple-500/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <LogOut size={17} />

                <span>
                  {isLoggingOut
                    ? "Signing out..."
                    : "Sign out"}
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// =============================================================
// Menu Item
// =============================================================

function MenuItem({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ x: 2 }}
      transition={{
        duration: 0.15,
      }}
    >
      <Link
        href={href}
        onClick={onClick}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/75 transition-colors hover:bg-white/8 hover:text-white"
      >
        {icon}

        <span>
          {label}
        </span>
      </Link>
    </motion.div>
  );
}

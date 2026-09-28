"use client";

import Lenis from "lenis";
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    lenisInstance?: Lenis | null;
  }
}

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({
  children,
}: SmoothScrollProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Prevent multiple Lenis instances
    if (window.lenisInstance) {
      const savedPosition =
        sessionStorage.getItem("scrollPosition");

      if (savedPosition) {
        window.lenisInstance.scrollTo(
          parseFloat(savedPosition),
          {
            immediate: true,
          }
        );

        sessionStorage.removeItem("scrollPosition");
      }

      return;
    }

    // Create Lenis instance
    const lenis = new Lenis({
      // Faster premium smooth scrolling
      duration: 1.05,

      // Smooth and natural deceleration
      easing: (t: number) =>
        1 - Math.pow(1 - t, 4),

      // Enable smooth wheel scrolling
      smoothWheel: true,

      // Slightly faster wheel movement
      wheelMultiplier: 1.05,

      // Faster touch scrolling
      touchMultiplier: 1.25,

      // Disable infinite scrolling
      infinite: false,

      // Better touch responsiveness
      syncTouch: true,

      // Use custom RAF
      autoRaf: false,
    });

    window.lenisInstance = lenis;

    let rafId: number;

    // Animation loop
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    // Save scroll position before leaving/reloading
    const handleBeforeUnload = () => {
      sessionStorage.setItem(
        "scrollPosition",
        lenis.scroll.toString()
      );
    };

    window.addEventListener(
      "beforeunload",
      handleBeforeUnload
    );

    // Restore previous scroll position
    const savedPosition =
      sessionStorage.getItem("scrollPosition");

    if (savedPosition) {
      requestAnimationFrame(() => {
        lenis.scrollTo(
          parseFloat(savedPosition),
          {
            immediate: true,
          }
        );

        sessionStorage.removeItem(
          "scrollPosition"
        );
      });
    }

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);

      window.removeEventListener(
        "beforeunload",
        handleBeforeUnload
      );

      if (window.lenisInstance === lenis) {
        lenis.destroy();
        window.lenisInstance = null;
      }
    };
  }, [pathname]);

  return <>{children}</>;
}
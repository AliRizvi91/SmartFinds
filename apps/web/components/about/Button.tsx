import Link from 'next/link';
import { ReactNode } from 'react';
import clsx from 'clsx';

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'inverse' | 'inverseGhost';
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
};

const variants = {
  primary: 'bg-purple text-paper hover:bg-purple-dark',
  secondary: 'bg-ink text-paper hover:bg-ink-soft',
  ghost: 'bg-transparent text-ink-text border border-neutral-200 hover:border-purple hover:text-purple',
  // For use on dark/purple backgrounds (e.g. the About page's final CTA band).
  inverse: 'bg-white text-purple hover:bg-white/90',
  inverseGhost: 'bg-transparent text-white border border-white/30 hover:border-sky-light hover:text-sky-light',
};

export function Button({
  children,
  href,
  variant = 'primary',
  onClick,
  type = 'button',
  className,
}: ButtonProps) {
  const classes = clsx(
    'inline-flex items-center justify-center rounded-card px-5 py-3 text-[15px] font-medium transition-colors duration-150',
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

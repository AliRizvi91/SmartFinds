import Link from 'next/link';
import { ReactNode } from 'react';
import clsx from 'clsx';

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?:
    | 'primary'
    | 'secondary'
    | 'ghost'
    | 'inverse'
    | 'inverseGhost';
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
};

const variants = {
  primary:
    'bg-purple text-paper hover:bg-purple-dark',

  secondary:
    'bg-ink text-paper hover:bg-ink-soft',

  ghost:
    'border border-neutral-200 bg-transparent text-ink-text hover:border-purple hover:text-purple',

  inverse:
    'bg-white text-purple shadow-sm hover:bg-white/90',

  inverseGhost:
    'border border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-white/50 hover:bg-white/10',
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
    'inline-flex items-center justify-center rounded-full px-4 py-3 text-[13px] font-medium transition-colors duration-150',
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

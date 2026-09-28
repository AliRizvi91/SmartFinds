import { ReactNode } from 'react';
import clsx from 'clsx';

export function SectionHeading({
  title,
  supporting,
  align = 'left',
}: {
  title: ReactNode;
  supporting?: ReactNode;
  align?: 'left' | 'center';
}) {
  return (
    <div className={clsx('max-w-2xl text-center', align === 'center' && 'mx-auto text-center')}>
      <h2 className="font-display text-3xl leading-tight text-ink-text md:text-4xl">
        {title}
      </h2>
      {supporting && (
        <p className="mt-4 text-[17px] leading-relaxed text-neutral-500">{supporting}</p>
      )}
    </div>
  );
}

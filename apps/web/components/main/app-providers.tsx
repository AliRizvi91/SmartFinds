'use client';

import StoreProvider from '@/store/provider';

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StoreProvider>{children}</StoreProvider>;
}

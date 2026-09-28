import type { Metadata, Viewport } from 'next';
import {
  DM_Serif_Display,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
} from 'next/font/google';

import './globals.css';

import AppProviders from '@/components/main/app-providers';
import SmoothScroll from '@/components/ui/SmoothScroll';
import { Toaster } from 'sonner';

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-dm-serif-display',
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
});

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-plex-sans',
  weight: ['400', '500', '600'],
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-plex-mono',
  weight: ['400'],
  display: 'swap',
});

const siteUrl = 'https://smartfinds.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: 'SmartFinds — Partnership Infrastructure for Growth',
    template: '%s · SmartFinds',
  },

  description:
    'SmartFinds connects advertisers and publishers with tracked links, transparent commissions, and real-time performance reporting.',

  applicationName: 'SmartFinds',

  keywords: [
    'affiliate marketing',
    'affiliate platform',
    'affiliate network',
    'publisher marketing',
    'advertiser marketing',
    'partnership marketing',
    'performance marketing',
    'affiliate tracking',
    'affiliate management',
    'SmartFinds',
  ],

  authors: [
    {
      name: 'SmartFinds',
      url: siteUrl,
    },
  ],

  creator: 'SmartFinds',
  publisher: 'SmartFinds',

  category: 'business',

  alternates: {
    canonical: '/',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  icons: {
    icon: [
      {
        url: '/favicon.ico',
      },
      {
        url: '/icon.png',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/apple-icon.png',
        type: 'image/png',
      },
    ],
  },

  manifest: '/site.webmanifest',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'SmartFinds',

    title: 'SmartFinds — Partnership Infrastructure for Growth',

    description:
      'Connect advertisers and publishers with tracked links, transparent commissions, and real-time performance reporting.',

    images: [
      {
        url: '/social/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SmartFinds — Partnership Infrastructure for Growth',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title: 'SmartFinds — Partnership Infrastructure for Growth',

    description:
      'Connect advertisers and publishers with tracked links, transparent commissions, and real-time performance reporting.',

    images: [
      {
        url: '/social/twitter.png',
        width: 1200,
        height: 675,
        alt: 'SmartFinds — Partnership Infrastructure for Growth',
      },
    ],
  },

  other: {
    'theme-color': '#0F1C1A',
    'color-scheme': 'light',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0F1C1A',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body className="font-sans antialiased">
        <AppProviders>
          <SmoothScroll>{children}</SmoothScroll>

          <Toaster
            position="bottom-right"
            theme="dark"
            richColors
            closeButton
            toastOptions={{
              duration: 9000,
              classNames: {
                toast:
                  'bg-black font-display text-sm text-purple border border-gray-800',
                title: 'text-white',
                description: 'text-gray-300',
                actionButton: 'bg-white text-black',
                closeButton:
                  'text-black hover:text-white bg-gray-100 hover:bg-gray-700 border-none',
              },
            }}
          />
        </AppProviders>
      </body>
    </html>
  );
}
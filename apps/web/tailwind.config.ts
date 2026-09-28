import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',

  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F7F6F2',
          raised: '#FFFFFF',
        },

        ink: {
          DEFAULT: '#0F1C1A',
          soft: '#16241F',
          text: '#10201D',
        },

        sky: {
          DEFAULT: '#0284C7',
          dark: '#0369A1',
          light: '#38BDF8',
          soft: '#7DD3FC',
        },

        purple: {
          DEFAULT: '#7129b0',
          dark: '#6B21A8',
          light: '#A855F7',
          soft: '#C084FC',
        },

        gold: {
          DEFAULT: '#C9A227',
          soft: '#E4C766',
          real: '#ffdc67',
        },

        neutral: {
          500: '#6B7280',
          200: '#E4E1D8',
        },
      },

      fontFamily: {
        display: ['var(--font-dm-serif-display)', 'serif'],
        sans: ['var(--font-plex-sans)', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'monospace'],
      },

      maxWidth: {
        content: '1180px',
      },

      borderRadius: {
        card: '10px',
      },
    },
  },

  plugins: [],
};

export default config;
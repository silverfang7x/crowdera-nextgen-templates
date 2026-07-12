import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      fontSize: {
        /* 1.333 modular scale from 0.75rem (12px) to 4.5rem (72px) */
        'xs': ['0.75rem', { lineHeight: '1.4' }],       /* 12px */
        'base': ['1rem', { lineHeight: '1.6' }],        /* 16px */
        'lg': ['1.333rem', { lineHeight: '1.5' }],      /* 21.33px */
        'xl': ['1.777rem', { lineHeight: '1.4' }],      /* 28.43px */
        '2xl': ['2.369rem', { lineHeight: '1.3' }],     /* 37.9px */
        '3xl': ['3.158rem', { lineHeight: '1.2' }],     /* 50.52px */
        '4xl': ['4.209rem', { lineHeight: '1.1' }],     /* 67.34px */
        'display': ['4.5rem', { lineHeight: '1.05' }],   /* 72px */
      },
      spacing: {
        /* Custom spacing scale: 4px base, extended with 2px (0.5) and large section values */
        '0.5': '2px',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',   /* Large section spacing (96px) */
        '32': '128px',  /* Large section spacing (128px) */
        '40': '160px',  /* Large section spacing (160px) */
      },
      colors: {
        /* Semantic theme colors using the CSS variable + opacity-modifier pattern */
        surface: 'hsl(var(--color-surface) / <alpha-value>)',
        'surface-elevated': 'hsl(var(--color-surface-elevated) / <alpha-value>)',
        ink: 'hsl(var(--color-ink) / <alpha-value>)',
        'ink-muted': 'hsl(var(--color-ink-muted) / <alpha-value>)',
        accent: 'hsl(var(--color-accent) / <alpha-value>)',
        'accent-contrast': 'hsl(var(--color-accent-contrast) / <alpha-value>)',
        border: 'hsl(var(--color-border) / <alpha-value>)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
    },
  },
  plugins: [],
};

export default config;

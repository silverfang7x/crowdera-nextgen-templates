import type { Metadata } from 'next';
import { Instrument_Serif, Public_Sans, Fraunces, Plus_Jakarta_Sans, EB_Garamond, Inter } from 'next/font/google';
import { ThemeProvider } from './providers';
import { ThemeCustomizer } from '@/components/ui/ThemeCustomizer';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  variable: '--font-serif-editorial',
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
});

const publicSans = Public_Sans({
  variable: '--font-sans-editorial',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

const fraunces = Fraunces({
  variable: '--font-serif-expressive',
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-sans-expressive',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

const ebGaramond = EB_Garamond({
  variable: '--font-serif-scholarly',
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
});

const inter = Inter({
  variable: '--font-sans-scholarly',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Clearwater Relief Trust — Emergency Rapid Relief & Clean Water',
  description: 'A rapid-response disaster relief organization deploying water purification, medical aid, and survival support directly to families in crisis zones.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Clearwater Relief Trust — Emergency Rapid Relief & Clean Water',
    description: 'A rapid-response disaster relief organization deploying water purification, medical aid, and survival support directly to families in crisis zones.',
    url: 'https://clearwaterrelief.org',
    siteName: 'Clearwater Relief Trust',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${publicSans.variable} ${fraunces.variable} ${plusJakartaSans.variable} ${ebGaramond.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-surface text-ink font-sans transition-colors duration-200">
        <ThemeProvider>
          {children}
          <ThemeCustomizer />
        </ThemeProvider>
      </body>
    </html>
  );
}

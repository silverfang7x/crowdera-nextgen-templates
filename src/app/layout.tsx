import type { Metadata } from 'next';
import { Instrument_Serif, Public_Sans } from 'next/font/google';
import { ThemeProvider } from './providers';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
});

const publicSans = Public_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Clearwater Relief Trust — Emergency Rapid Relief & Clean Water',
  description: 'A rapid-response disaster relief organization deploying water purification, medical aid, and survival support directly to families in crisis zones.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${publicSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-surface text-ink font-sans transition-colors duration-200">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

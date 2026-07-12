'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    const savedPreset = localStorage.getItem('npo-theme-preset') || 'disaster-relief';
    document.documentElement.setAttribute('data-theme', savedPreset);
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light" // Set default theme mode to light
      enableSystem={false} // Disable auto system theme to prioritize our preset-mode switcher
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

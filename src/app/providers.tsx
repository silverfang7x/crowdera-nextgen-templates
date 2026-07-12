'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="humanitarian"
      enableSystem={false} // Disable auto system theme to prioritize our preset-mode switcher
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

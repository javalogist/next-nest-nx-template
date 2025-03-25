// src/app/layout.tsx
import type { Metadata } from 'next';
import React from 'react';
import ThemeRegistry from '../theme/theme-registry';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import ThemeToggleButton from '../theme/theme-toggle';
import { Roboto } from 'next/font/google';


export const metadata: Metadata = {
  title: 'My Next.js App',
  description: 'Next.js app with MUI using App Router'
};

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Match the weights used in the theme
  variable: '--font-roboto' // Optional CSS variable
});


export default function RootLayout({
                                     children
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
    <body>
    <AppRouterCacheProvider>
      <ThemeRegistry>
        {children}
      </ThemeRegistry>
    </AppRouterCacheProvider>
    </body>
    </html>
  );
}

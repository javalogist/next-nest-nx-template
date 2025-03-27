// src/app/layout.tsx
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './global.css';


import type { Metadata } from 'next';
import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Roboto } from 'next/font/google';
import { MyThemeProvider, ThemeRegistry } from '@shared/client';

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
      <MyThemeProvider>{children}</MyThemeProvider>
      {/*//For MUI, uncomment this*/}
      {/*<ThemeRegistry>{children}</ThemeRegistry>*/}
    </AppRouterCacheProvider>
    </body>
    </html>
  );
}

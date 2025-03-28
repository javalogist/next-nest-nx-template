'use client';

import { useLocalStorage, useHotkeys } from '@mantine/hooks';
import { MantineProvider } from '@mantine/core';
import { themeConfig } from './theme';
import React from 'react';
import { Notifications } from '@mantine/notifications';
import GlobalStyles from './global.styles';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultColorScheme?: 'light' | 'dark';
}

export default function ThemeProvider({ children, defaultColorScheme = 'light' }: ThemeProviderProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<'light' | 'dark'>({
    key: 'mantine-color-scheme',
    defaultValue: defaultColorScheme,
    getInitialValueInEffect: true
  });

  const toggleColorScheme = (value?: 'light' | 'dark') =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  // Merge the color scheme with your theme configuration
  const theme = {
    ...(colorScheme === 'dark' ? themeConfig.dark : themeConfig.light),
    colorScheme
  };

  return (
    <MantineProvider theme={theme} defaultColorScheme={defaultColorScheme}>
      <GlobalStyles />
      <Notifications position="top-right" limit={5} zIndex={1000} />
      {children}
    </MantineProvider>
  );
}

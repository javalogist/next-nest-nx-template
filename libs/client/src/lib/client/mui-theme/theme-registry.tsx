// src/components/ThemeRegistry.tsx
'use client';

import React from 'react';
import { ThemeContextProvider } from './theme-context';

interface ThemeRegistryProps {
  children: React.ReactNode;
}

export const ThemeRegistry = ({ children }: ThemeRegistryProps) => {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
};

// src/context/ThemeContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { darkResponsiveTheme, lightResponsiveTheme } from './theme';

// Define the context type
interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

// Theme provider component
export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Get system theme using matchMedia
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light'; // Fallback to light if window is undefined (SSR)
  };

  // Initial theme based on system preference
  const [mode, setMode] = useState<'light' | 'dark'>(getSystemTheme);

  // Effect to listen for system theme changes dynamically
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      setMode(mediaQuery.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Toggle theme manually
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Choose theme based on mode
  const theme = useMemo(
    () => (mode === 'light' ? lightResponsiveTheme : darkResponsiveTheme),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

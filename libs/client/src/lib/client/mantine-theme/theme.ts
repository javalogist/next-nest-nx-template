import { createTheme } from '@mantine/core';

export const lightTheme = createTheme({
  /* ✅ Light Theme */
  colors: {
    brand: [
      '#E3F2FD',
      '#BBDEFB',
      '#90CAF9',
      '#64B5F6',
      '#42A5F5',
      '#2196F3', // Primary Blue
      '#1E88E5',
      '#1976D2',
      '#1565C0',
      '#0D47A1',
    ],
    success: [
      '#E8F5E9',
      '#C8E6C9',
      '#A5D6A7',
      '#81C784',
      '#66BB6A',
      '#4CAF50', // Success Green
      '#43A047',
      '#388E3C',
      '#2E7D32',
      '#1B5E20',
    ],
    gray: [
      '#F9FAFB',
      '#F3F4F6',
      '#E5E7EB',
      '#D1D5DB',
      '#9CA3AF',
      '#6B7280',
      '#4B5563',
      '#374151',
      '#1F2937',
      '#111827',
    ],
  },
  primaryColor: 'brand',
  defaultRadius: 'md',
  fontFamily: 'Inter, sans-serif',
  components: {
    Button: {
      styles: () => ({
        root: {
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
      }),
    },
  },
});

export const darkTheme = createTheme({
  /* ✅ Dark Theme */
  colors: {
    brand: [
      '#1B1F3B',
      '#16213E',
      '#0F3460',
      '#1A5276',
      '#1E88E5',
      '#42A5F5', // Primary Blue Glow
      '#4FC3F7',
      '#81D4FA',
      '#B3E5FC',
      '#E1F5FE',
    ],
    success: [
      '#0F1A23',
      '#162A3D',
      '#1E3B57',
      '#25547E',
      '#2B6AA6',
      '#3081CF', // Success Aqua
      '#35A1F0',
      '#58C7FF',
      '#82E0F7',
      '#B3E9FF',
    ],
    gray: [
      '#121212',
      '#1A1A1A',
      '#242424',
      '#2E2E2E',
      '#3A3A3A',
      '#484848',
      '#5C5C5C',
      '#757575',
      '#9E9E9E',
      '#BDBDBD',
    ],
  },
  primaryColor: 'brand',
  defaultRadius: 'md',
  fontFamily: 'Inter, sans-serif',
  components: {
    Button: {
      styles: () => ({
        root: {
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
      }),
    },
  },
});

export const themeConfig = {
  light: lightTheme,
  dark: darkTheme,
};

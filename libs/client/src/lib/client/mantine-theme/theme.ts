import { createTheme } from '@mantine/core';

export const lightTheme = createTheme({
  /* your light theme configuration */
  colors: {
    brand: ['#F0F5FF', '#D6E4FF', '#ADC8FF', '#85A8FF', '#6690FF', '#4D73FF', '#3D60FF', '#3451D9', '#2C45B3', '#243A8C'],
  },
  primaryColor: 'brand',
});

export const darkTheme = createTheme({
  /* your dark theme configuration */
  colors: {
    brand: ['#1A1A2E', '#16213E', '#0F3460', '#1A5276', '#1E8449', '#229954', '#28B463', '#58D68D', '#82E0AA', '#ABEBC6'],
  },
  primaryColor: 'brand',
});

export const themeConfig = {
  light: lightTheme,
  dark: darkTheme,
};

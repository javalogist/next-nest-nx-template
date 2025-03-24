import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';

// ✅ Extend MUI's Palette to add custom colors like `neutral`
declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

// 🎨 Define common typography settings
const typography :TypographyOptions = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 500,
    lineHeight: 1.4,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 500,
    lineHeight: 1.6,
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.7,
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.4,
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.4,
  },
  button: {
    textTransform: 'none',
    fontWeight: 600,
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: 1.25,
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
  },
};

// 🎨 Light theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976D2', // Primary blue
      light: '#63A4FF',
      dark: '#004BA0',
    },
    secondary: {
      main: '#FF4081', // Pink
      light: '#FF79B0',
      dark: '#C60055',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    neutral: {
      main: '#64748B',
      light: '#A3B8CC',
      dark: '#4B5563',
    },
    error: {
      main: '#D32F2F',
    },
    warning: {
      main: '#FFA000',
    },
    info: {
      main: '#0288D1',
    },
    success: {
      main: '#388E3C',
    },
  },
  typography,
  shape: {
    borderRadius: 8,
  },
  components: {
    // ✅ Button styles
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
        containedPrimary: {
          backgroundColor: '#1976D2',
          '&:hover': {
            backgroundColor: '#1565C0',
          },
        },
        containedSecondary: {
          backgroundColor: '#FF4081',
          '&:hover': {
            backgroundColor: '#F50057',
          },
        },
      },
    },
    // ✅ Card styles
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          borderRadius: 12,
          padding: '16px',
        },
      },
    },
    // ✅ Input/Outlined Input styles
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        input: {
          padding: '12px 14px',
        },
      },
    },
    // ✅ Dialog styles
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          padding: '16px',
        },
      },
    },
    // ✅ Typography styles
    MuiTypography: {
      styleOverrides: {
        h1: {
          color: '#1976D2',
        },
        h2: {
          color: '#FF4081',
        },
      },
    },
    // ✅ Chip styles
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

// 🌙 Dark theme (inherits light styles with customizations)
const darkTheme = createTheme({
  ...lightTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#90CAF9',
      light: '#E3F2FD',
      dark: '#42A5F5',
    },
    secondary: {
      main: '#F48FB1',
      light: '#FFCDD2',
      dark: '#D81B60',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    neutral: {
      main: '#9CA3AF',
      light: '#E5E7EB',
      dark: '#6B7280',
    },
    error: {
      main: '#EF5350',
    },
    warning: {
      main: '#FFB74D',
    },
    info: {
      main: '#4FC3F7',
    },
    success: {
      main: '#66BB6A',
    },
  },
  typography,
  components: {
    ...lightTheme.components,
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#42A5F5',
          '&:hover': {
            backgroundColor: '#1E88E5',
          },
        },
        containedSecondary: {
          backgroundColor: '#F48FB1',
          '&:hover': {
            backgroundColor: '#F06292',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          color: '#90CAF9',
        },
        h2: {
          color: '#F48FB1',
        },
      },
    },
  },
});

// 📏 Make fonts responsive
const lightResponsiveTheme = responsiveFontSizes(lightTheme);
const darkResponsiveTheme = responsiveFontSizes(darkTheme);

export { lightResponsiveTheme, darkResponsiveTheme };

// src/components/ThemeToggleButton.tsx
'use client';

import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeContext } from './theme-context';

const ThemeToggleButton = () => {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <IconButton
      onClick={toggleTheme}
      color="inherit"
      sx={{ marginLeft: 'auto' }}
    >
      {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
};

export default ThemeToggleButton;

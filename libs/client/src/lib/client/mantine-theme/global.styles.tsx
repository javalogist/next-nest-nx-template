'use client';
import { Global } from '@emotion/react';

export default function GlobalStyles() {
  return (
    <Global
      styles={{
        body: {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
          fontFamily: 'Inter, sans-serif',
          backgroundColor: 'var(--mantine-color-body)',
          color: 'var(--mantine-color-text)',
          transition: 'background-color 1.5s ease-in-out, color 1.5s ease-in-out', // ✅ Transition here
        },
        a: {
          textDecoration: 'none',
          color: 'inherit',
        },
        '*': {
          boxSizing: 'border-box',
        },
        // ✅ This transition affects body when class is applied to html
        'html.theme-transition body': {
          transition: 'background-color 1.5s ease-in-out, color 1.5s ease-in-out',
        },
      }}
    />
  );
}

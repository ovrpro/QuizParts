import type { ThemeTokens } from './types.js';

export const defaultTheme: ThemeTokens = {
  colors: {
    primary: '#2563eb',
    primaryContrast: '#ffffff',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#0f172a',
    textMuted: '#64748b',
    correct: '#16a34a',
    incorrect: '#dc2626',
    border: '#e2e8f0',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSizeBase: '16px',
    fontSizeSm: '14px',
    fontSizeLg: '18px',
    fontWeightNormal: 400,
    fontWeightBold: 600,
    lineHeight: 1.5,
  },
  motion: {
    durationFast: '150ms',
    durationNormal: '250ms',
    durationSlow: '350ms',
  },
  shadow: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
  },
};

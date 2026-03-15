import type { ThemeTokens } from './types.js';
import { defaultTheme } from './defaultTheme.js';

export const darkTheme: ThemeTokens = {
  ...defaultTheme,
  colors: {
    primary: '#3b82f6',
    primaryContrast: '#ffffff',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f8fafc',
    textMuted: '#94a3b8',
    correct: '#22c55e',
    incorrect: '#ef4444',
    border: '#334155',
  },
};

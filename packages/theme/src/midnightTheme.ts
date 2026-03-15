import type { ThemeTokens } from './types.js';
import { playTheme } from './playTheme.js';

/** QuizParts Midnight: dark-mode coding/quiz theme. */
export const midnightTheme: ThemeTokens = {
  ...playTheme,
  foundation: {
    ...playTheme.foundation,
    colors: {
      ...playTheme.foundation.colors,
      blue500: '#38bdf8',
      blue600: '#0ea5e9',
      white: '#f8fafc',
      slate800: '#0f172a',
      slate500: '#94a3b8',
      green500: '#4ade80',
      green100: '#14532d',
      orange500: '#fb923c',
      orange100: '#431407',
      amber400: '#facc15',
      stone200: '#334155',
      stone100: '#1e293b',
      warmBg: '#0f172a',
      indigo500: '#818cf8',
    },
    shadow: {
      sm: '0 1px 2px rgba(0,0,0,0.3)',
      md: '0 4px 6px -1px rgba(0,0,0,0.3), 0 2px 4px -2px rgba(0,0,0,0.2)',
      card: '0 4px 12px rgba(0,0,0,0.25)',
      button: '0 2px 4px rgba(0,0,0,0.2)',
    },
  },
  semantic: {
    color: {
      background: '#0f172a',
      surface: '#1e293b',
      primary: '#38bdf8',
      primaryContrast: '#0f172a',
      secondary: '#818cf8',
      text: '#f8fafc',
      textMuted: '#94a3b8',
      success: '#4ade80',
      successSoft: 'rgba(74, 222, 128, 0.15)',
      danger: '#fb923c',
      dangerSoft: 'rgba(251, 146, 60, 0.12)',
      warning: '#facc15',
      border: '#334155',
    },
  },
};

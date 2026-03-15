import type { ThemeTokens } from './types.js';
import { playTheme } from './playTheme.js';

/** QuizParts Calm: soft, neutral studying theme. */
export const calmTheme: ThemeTokens = {
  ...playTheme,
  foundation: {
    ...playTheme.foundation,
    colors: {
      ...playTheme.foundation.colors,
      blue500: '#64748b',
      blue600: '#475569',
      warmBg: '#f8fafc',
      stone200: '#e2e8f0',
      stone100: '#f1f5f9',
      green500: '#16a34a',
      green100: '#dcfce7',
      orange500: '#ea580c',
      orange100: '#ffedd5',
    },
    shadow: {
      sm: '0 1px 2px rgba(0,0,0,0.04)',
      md: '0 2px 4px rgba(0,0,0,0.06)',
      card: '0 2px 8px rgba(0,0,0,0.04)',
      button: '0 1px 2px rgba(0,0,0,0.05)',
    },
  },
  semantic: {
    color: {
      background: '#f8fafc',
      surface: '#ffffff',
      primary: '#64748b',
      primaryContrast: '#ffffff',
      secondary: '#475569',
      text: '#334155',
      textMuted: '#64748b',
      success: '#16a34a',
      successSoft: '#dcfce7',
      danger: '#ea580c',
      dangerSoft: '#ffedd5',
      warning: '#ca8a04',
      border: '#e2e8f0',
    },
  },
  components: {
    ...playTheme.components,
    choice: {
      ...playTheme.components.choice,
      radius: 'var(--qp-foundation-radius-md)',
    },
    card: {
      ...playTheme.components.card,
      radius: 'var(--qp-foundation-radius-md)',
      shadow: 'var(--qp-foundation-shadow-card)',
    },
  },
  motion: {
    ...playTheme.motion,
    durationFast: '180ms',
    durationNormal: '240ms',
    easingStandard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    successAnimation: 'none',
    errorAnimation: 'none',
  },
  interaction: {
    ...playTheme.interaction,
    hoverScale: 1,
    correctBounce: false,
    incorrectShake: false,
  },
};

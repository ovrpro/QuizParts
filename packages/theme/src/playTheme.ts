import type { ThemeTokens } from './types.js';

/** QuizParts Play: playful, encouraging, game-like default theme. */
export const playTheme: ThemeTokens = {
  foundation: {
    colors: {
      blue500: '#2563eb',
      blue600: '#1d4ed8',
      white: '#ffffff',
      slate800: '#0f172a',
      slate500: '#475569',
      green500: '#16a34a',
      green100: '#dcfce7',
      orange500: '#ea580c',
      orange100: '#ffedd5',
      amber400: '#f59e0b',
      stone200: '#cbd5e1',
      stone100: '#f8fafc',
      warmBg: '#f4efe4',
      indigo500: '#7c3aed',
      magenta500: '#db2777',
      gold300: '#fcd34d',
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '22px',
      xl: '32px',
    },
    radius: {
      sm: '8px',
      md: '14px',
      lg: '22px',
      full: '9999px',
    },
    shadow: {
      sm: '0 10px 24px rgba(37,99,235,0.10)',
      md: '0 18px 38px rgba(15,23,42,0.14)',
      card: '0 24px 60px rgba(15,23,42,0.16), 0 8px 24px rgba(124,58,237,0.10)',
      button: '0 14px 30px rgba(37,99,235,0.28)',
    },
    typography: {
      fontFamily: '"Nunito Sans", "Avenir Next", "Segoe UI", sans-serif',
      fontSizeBase: '17px',
      fontSizeSm: '13px',
      fontSizeLg: '24px',
      fontWeightNormal: 400,
      fontWeightBold: 700,
      lineHeight: 1.55,
    },
  },
  semantic: {
    color: {
      background: '#f4efe4',
      surface: '#fffdf8',
      primary: '#2563eb',
      primaryContrast: '#ffffff',
      secondary: '#7c3aed',
      text: '#0f172a',
      textMuted: '#475569',
      success: '#16a34a',
      successSoft: '#dcfce7',
      danger: '#ea580c',
      dangerSoft: '#ffedd5',
      warning: '#f59e0b',
      border: '#cbd5e1',
    },
  },
  components: {
    choice: {
      padding: 'var(--qp-foundation-spacing-md) var(--qp-foundation-spacing-lg)',
      radius: 'var(--qp-foundation-radius-lg)',
      borderWidth: '2px',
      minHeight: '48px',
    },
    button: {
      height: '48px',
      radius: 'var(--qp-foundation-radius-full)',
      paddingX: 'var(--qp-foundation-spacing-xl)',
    },
    card: {
      padding: 'var(--qp-foundation-spacing-xl)',
      radius: 'var(--qp-foundation-radius-lg)',
      shadow: 'var(--qp-foundation-shadow-card)',
    },
    progress: {
      height: '8px',
      radius: 'var(--qp-foundation-radius-full)',
    },
    feedback: {
      padding: 'var(--qp-foundation-spacing-lg)',
      radius: 'var(--qp-foundation-radius-lg)',
    },
  },
  states: {
    correct: {
      background: 'var(--qp-semantic-color-successSoft)',
      border: 'var(--qp-semantic-color-success)',
      text: 'var(--qp-semantic-color-text)',
    },
    incorrect: {
      background: 'var(--qp-semantic-color-dangerSoft)',
      border: 'var(--qp-semantic-color-danger)',
      text: 'var(--qp-semantic-color-text)',
    },
    selected: {
      background: 'color-mix(in srgb, var(--qp-semantic-color-primary) 16%, white)',
      border: 'var(--qp-semantic-color-primary)',
    },
  },
  motion: {
    durationFast: '150ms',
    durationNormal: '200ms',
    durationSlow: '350ms',
    easingStandard: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    easingBouncy: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    successAnimation: 'bounce',
    errorAnimation: 'shake',
  },
  interaction: {
    hoverScale: 1.02,
    pressScale: 0.98,
    correctBounce: true,
    incorrectShake: true,
  },
  layout: {
    maxContentWidth: '720px',
    mobileSpacing: 'var(--qp-foundation-spacing-lg)',
    desktopSpacing: 'var(--qp-foundation-spacing-xl)',
  },
  a11y: {
    minTapTarget: '44px',
    minContrast: 4.5,
  },
  decoration: {
    showIcons: true,
    correctIcon: '✓',
    incorrectIcon: '✕',
  },
};

import type { ThemeTokens } from './types.js';

/** QuizParts Play: playful, encouraging, game-like default theme. */
export const playTheme: ThemeTokens = {
  foundation: {
    colors: {
      blue500: '#0ea5e9',
      blue600: '#0284c7',
      white: '#ffffff',
      slate800: '#1e293b',
      slate500: '#64748b',
      green500: '#22c55e',
      green100: '#dcfce7',
      orange500: '#f97316',
      orange100: '#ffedd5',
      amber400: '#eab308',
      stone200: '#e7e5e4',
      stone100: '#f5f5f4',
      warmBg: '#faf9f7',
      indigo500: '#6366f1',
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '14px',
      lg: '20px',
      xl: '28px',
    },
    radius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
      full: '9999px',
    },
    shadow: {
      sm: '0 1px 2px rgba(0,0,0,0.06)',
      md: '0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.06)',
      card: '0 4px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
      button: '0 2px 4px rgba(0,0,0,0.08)',
    },
    typography: {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontSizeBase: '16px',
      fontSizeSm: '14px',
      fontSizeLg: '18px',
      fontWeightNormal: 400,
      fontWeightBold: 600,
      lineHeight: 1.5,
    },
  },
  semantic: {
    color: {
      background: '#faf9f7',
      surface: '#ffffff',
      primary: '#0ea5e9',
      primaryContrast: '#ffffff',
      secondary: '#6366f1',
      text: '#1e293b',
      textMuted: '#64748b',
      success: '#22c55e',
      successSoft: '#dcfce7',
      danger: '#f97316',
      dangerSoft: '#ffedd5',
      warning: '#eab308',
      border: '#e7e5e4',
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
      background: 'color-mix(in srgb, var(--qp-semantic-color-primary) 12%, transparent)',
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

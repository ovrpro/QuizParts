/**
 * React Native theme: numeric values for StyleSheet.
 * Mirrors play.css semantics (primary, success, danger, spacing, etc.).
 */

export interface RNTheme {
  colors: {
    background: string;
    surface: string;
    primary: string;
    primaryContrast: string;
    text: string;
    textMuted: string;
    success: string;
    successSoft: string;
    danger: string;
    dangerSoft: string;
    border: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  fontSize: {
    base: number;
    sm: number;
    lg: number;
  };
  fontWeight: {
    normal: '400' | '500' | '600' | '700';
    bold: '400' | '500' | '600' | '700';
  };
  radius: {
    sm: number;
    md: number;
    lg: number;
    full: number;
  };
  minTapTarget: number;
  progressBarHeight: number;
}

export const defaultTheme: RNTheme = {
  colors: {
    background: '#f4efe4',
    surface: '#fffdf8',
    primary: '#2563eb',
    primaryContrast: '#ffffff',
    text: '#0f172a',
    textMuted: '#475569',
    success: '#16a34a',
    successSoft: '#dcfce7',
    danger: '#ea580c',
    dangerSoft: '#ffedd5',
    border: '#cbd5e1',
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 22, xl: 32 },
  fontSize: { base: 17, sm: 13, lg: 24 },
  fontWeight: { normal: '400', bold: '700' },
  radius: { sm: 8, md: 14, lg: 22, full: 9999 },
  minTapTarget: 44,
  progressBarHeight: 8,
};

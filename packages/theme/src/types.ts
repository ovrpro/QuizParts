/** Theme token shape for @quizparts/theme */

export interface ColorTokens {
  primary: string;
  primaryContrast: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  correct: string;
  incorrect: string;
  border: string;
}

export interface SpacingTokens {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface RadiusTokens {
  sm: string;
  md: string;
  lg: string;
  full: string;
}

export interface TypographyTokens {
  fontFamily: string;
  fontSizeBase: string;
  fontSizeSm: string;
  fontSizeLg: string;
  fontWeightNormal: number;
  fontWeightBold: number;
  lineHeight: number;
}

export interface MotionTokens {
  durationFast: string;
  durationNormal: string;
  durationSlow: string;
}

export interface ShadowTokens {
  sm: string;
  md: string;
}

export interface ThemeTokens {
  colors: ColorTokens;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  typography: TypographyTokens;
  motion: MotionTokens;
  shadow: ShadowTokens;
}

export type ThemeOverrides = Partial<{
  colors: Partial<ColorTokens>;
  spacing: Partial<SpacingTokens>;
  radius: Partial<RadiusTokens>;
  typography: Partial<TypographyTokens>;
  motion: Partial<MotionTokens>;
  shadow: Partial<ShadowTokens>;
}>;

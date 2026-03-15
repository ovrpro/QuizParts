/** @quizparts/theme - Theme tokens and CSS variable helpers */

export const THEME_VERSION = '0.0.1';

export type {
  ThemeTokens,
  ThemeOverrides,
  ColorTokens,
  SpacingTokens,
  RadiusTokens,
  TypographyTokens,
  MotionTokens,
  ShadowTokens,
} from './types.js';

export { defaultTheme } from './defaultTheme.js';
export { darkTheme } from './darkTheme.js';
export { createTheme } from './createTheme.js';
export { tokensToCssVars, tokensToCssVarsString } from './tokensToCssVars.js';

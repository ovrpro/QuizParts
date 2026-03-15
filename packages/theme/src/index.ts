/**
 * @quizparts/theme – Design system tokens and CSS variable helpers.
 *
 * Use defaultTheme (Play), calmTheme, or midnightTheme; override with createTheme/mergeTheme;
 * apply to the DOM with tokensToCssVars(theme) on a wrapper and import `@quizparts/theme/play.css`.
 */

/** Current theme package version. */
export const THEME_VERSION = '0.0.2';

export type {
  ThemeTokens,
  ThemeOverrides,
  FoundationTokens,
  SemanticTokens,
  ComponentTokens,
  StateTokens,
  MotionTokens,
  InteractionTokens,
  LayoutTokens,
  A11yTokens,
  DecorationTokens,
  LegacyThemeTokens,
} from './types.js';

export { defaultTheme } from './defaultTheme.js';
export { playTheme } from './playTheme.js';
export { calmTheme } from './calmTheme.js';
export { midnightTheme } from './midnightTheme.js';
export { darkTheme } from './darkTheme.js';
export { createTheme, mergeTheme } from './createTheme.js';
export { tokensToCssVars, tokensToCssVarsString } from './tokensToCssVars.js';

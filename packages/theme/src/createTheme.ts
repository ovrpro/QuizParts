import type { ThemeTokens, ThemeOverrides } from './types.js';
import { defaultTheme } from './defaultTheme.js';

const mergeDeep = <T extends object>(target: T, source: Partial<T>): T => {
  const out = { ...target } as T;
  for (const key of Object.keys(source) as (keyof T)[]) {
    const val = source[key];
    const targetVal = (target as Record<string, unknown>)[key as string];
    if (val != null && typeof val === 'object' && !Array.isArray(val) && typeof targetVal === 'object' && targetVal != null) {
      (out as Record<string, unknown>)[key as string] = mergeDeep(
        targetVal as object,
        val as object
      );
    } else if (val !== undefined) {
      (out as Record<string, unknown>)[key as string] = val;
    }
  }
  return out;
};

/**
 * Create a theme from the default (Play) theme with optional overrides.
 * @param overrides - Partial tokens to merge (e.g. semantic.color.primary).
 * @returns Full ThemeTokens (defaultTheme when overrides is omitted).
 */
export const createTheme = (overrides?: ThemeOverrides): ThemeTokens =>
  overrides ? (mergeDeep(defaultTheme, overrides) as ThemeTokens) : { ...defaultTheme };

/**
 * Merge overrides onto any base theme. Use for live tweaking or composing themes.
 * @param base - Base theme (e.g. playTheme, calmTheme).
 * @param overrides - Partial tokens to merge.
 * @returns New ThemeTokens with overrides applied.
 */
export const mergeTheme = (base: ThemeTokens, overrides: ThemeOverrides): ThemeTokens =>
  mergeDeep(base, overrides) as ThemeTokens;

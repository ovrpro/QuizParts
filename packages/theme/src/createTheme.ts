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

export const createTheme = (overrides?: ThemeOverrides): ThemeTokens =>
  overrides ? (mergeDeep(defaultTheme, overrides) as ThemeTokens) : { ...defaultTheme };

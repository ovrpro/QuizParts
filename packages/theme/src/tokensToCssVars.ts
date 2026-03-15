import type { ThemeTokens } from './types.js';

const prefix = 'qp';

const flatten = (obj: object, path: string[] = []): Record<string, string> => {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const nextPath = [...path, key];
    if (value != null && typeof value === 'object' && !Array.isArray(value) && typeof value !== 'string') {
      const sub = flatten(value as object, nextPath);
      Object.assign(out, sub);
    } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      out[`--${prefix}-${nextPath.join('-')}`] = String(value);
    }
  }
  return out;
};

/**
 * Convert a theme to CSS custom properties (--qp-*). Apply to a wrapper element's style.
 * @param theme - Full theme (e.g. defaultTheme, or result of createTheme/mergeTheme).
 * @returns Record of var names to values (e.g. { '--qp-semantic-color-primary': '#0ea5e9' }).
 */
export const tokensToCssVars = (theme: ThemeTokens): Record<string, string> =>
  flatten(theme);

/**
 * Same as tokensToCssVars but returns a string suitable for inline style or a style attribute.
 * @param theme - Full theme.
 * @returns Semicolon-separated CSS var declarations.
 */
export const tokensToCssVarsString = (theme: ThemeTokens): string => {
  const vars = tokensToCssVars(theme);
  return Object.entries(vars)
    .map(([k, v]) => `${k}: ${v}`)
    .join('; ');
};

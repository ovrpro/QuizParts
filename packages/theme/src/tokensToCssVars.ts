import type { ThemeTokens } from './types.js';

const prefix = 'qp';

const flatten = (obj: object, path: string[] = []): Record<string, string> => {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const nextPath = [...path, key];
    if (value != null && typeof value === 'object' && !Array.isArray(value) && typeof value !== 'string') {
      const sub = flatten(value as object, nextPath);
      Object.assign(out, sub);
    } else if (typeof value === 'string' || typeof value === 'number') {
      out[`--${prefix}-${nextPath.join('-')}`] = String(value);
    }
  }
  return out;
};

export const tokensToCssVars = (theme: ThemeTokens): Record<string, string> =>
  flatten(theme);

export const tokensToCssVarsString = (theme: ThemeTokens): string => {
  const vars = tokensToCssVars(theme);
  return Object.entries(vars)
    .map(([k, v]) => `${k}: ${v}`)
    .join('; ');
};

import { describe, it, expect } from 'vitest';
import type { ThemeOverrides } from './types.js';
import {
  THEME_VERSION,
  defaultTheme,
  darkTheme,
  midnightTheme,
  calmTheme,
  createTheme,
  tokensToCssVars,
  tokensToCssVarsString,
} from './index.js';

describe('@quizparts/theme', () => {
  it('exports THEME_VERSION', () => {
    expect(THEME_VERSION).toBe('0.0.2');
  });

  it('defaultTheme has required token layers', () => {
    expect(defaultTheme.foundation).toBeDefined();
    expect(defaultTheme.semantic).toBeDefined();
    expect(defaultTheme.components).toBeDefined();
    expect(defaultTheme.semantic.color.primary).toBeDefined();
    expect(defaultTheme.foundation.spacing.md).toBeDefined();
    expect(defaultTheme.foundation.radius.md).toBeDefined();
    expect(defaultTheme.foundation.typography.fontFamily).toContain('Nunito Sans');
  });

  it('darkTheme (midnight) has dark semantic colors', () => {
    expect(darkTheme).toBe(midnightTheme);
    expect(darkTheme.semantic.color.background).toBe('#0f172a');
    expect(darkTheme.semantic.color.text).toBe('#f8fafc');
  });

  it('calmTheme and midnightTheme are exported', () => {
    expect(calmTheme.semantic.color.primary).toBe('#64748b');
    expect(midnightTheme.semantic.color.primary).toBe('#38bdf8');
  });

  it('createTheme merges overrides', () => {
    const t = createTheme({
      semantic: { color: { primary: '#ff0000' } },
    } as ThemeOverrides);
    expect(t.semantic.color.primary).toBe('#ff0000');
    expect(t.semantic.color.background).toBe(defaultTheme.semantic.color.background);
  });

  it('tokensToCssVars produces --qp- prefixed vars', () => {
    const vars = tokensToCssVars(defaultTheme);
    expect(vars['--qp-semantic-color-primary']).toBe('#2563eb');
    expect(vars['--qp-foundation-spacing-md']).toBe('16px');
    expect(vars['--qp-foundation-typography-fontSizeLg']).toBe('24px');
  });

  it('tokensToCssVarsString returns semicolon-separated string', () => {
    const s = tokensToCssVarsString(defaultTheme);
    expect(s).toContain('--qp-semantic-color-primary');
    expect(s).toContain('#2563eb');
  });
});

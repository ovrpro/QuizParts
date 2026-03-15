import { describe, it, expect } from 'vitest';
import {
  THEME_VERSION,
  defaultTheme,
  darkTheme,
  createTheme,
  tokensToCssVars,
  tokensToCssVarsString,
} from './index.js';

describe('@quizparts/theme', () => {
  it('exports THEME_VERSION', () => {
    expect(THEME_VERSION).toBe('0.0.1');
  });

  it('defaultTheme has required token groups', () => {
    expect(defaultTheme.colors.primary).toBeDefined();
    expect(defaultTheme.spacing.md).toBeDefined();
    expect(defaultTheme.radius.md).toBeDefined();
  });

  it('darkTheme overrides colors', () => {
    expect(darkTheme.colors.background).toBe('#0f172a');
    expect(darkTheme.colors.text).toBe('#f8fafc');
  });

  it('createTheme merges overrides', () => {
    const t = createTheme({ colors: { primary: '#ff0000' } });
    expect(t.colors.primary).toBe('#ff0000');
    expect(t.colors.background).toBe(defaultTheme.colors.background);
  });

  it('tokensToCssVars produces --qp- prefixed vars', () => {
    const vars = tokensToCssVars(defaultTheme);
    expect(vars['--qp-colors-primary']).toBe('#2563eb');
    expect(vars['--qp-spacing-md']).toBe('12px');
  });

  it('tokensToCssVarsString returns semicolon-separated string', () => {
    const s = tokensToCssVarsString(defaultTheme);
    expect(s).toContain('--qp-colors-primary');
    expect(s).toContain('#2563eb');
  });
});

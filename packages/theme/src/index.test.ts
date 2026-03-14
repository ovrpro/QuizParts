import { describe, it, expect } from 'vitest';
import { THEME_VERSION } from './index.js';

describe('@quizparts/theme', () => {
  it('exports THEME_VERSION', () => {
    expect(THEME_VERSION).toBe('0.0.1');
  });
});

import { describe, it, expect } from 'vitest';
import { CORE_VERSION } from './index.js';

describe('@quizparts/core', () => {
  it('exports CORE_VERSION', () => {
    expect(CORE_VERSION).toBe('0.0.1');
  });
});

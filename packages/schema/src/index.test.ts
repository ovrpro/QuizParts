import { describe, it, expect } from 'vitest';
import { SCHEMA_VERSION } from './index.js';

describe('@quizparts/schema', () => {
  it('exports SCHEMA_VERSION', () => {
    expect(SCHEMA_VERSION).toBe('0.0.1');
  });
});

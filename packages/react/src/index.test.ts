import { describe, it, expect } from 'vitest';
import { REACT_VERSION } from './index.js';

describe('@quizparts/react', () => {
  it('exports REACT_VERSION', () => {
    expect(REACT_VERSION).toBe('0.0.1');
  });
});

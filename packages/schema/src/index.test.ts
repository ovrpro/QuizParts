import { describe, it, expect } from 'vitest';
import { parseQuiz, validateQuiz } from './index.js';

const validMultipleChoice = {
  id: 'capital-quiz',
  title: 'Capital Quiz',
  questions: [
    {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'What is the capital of France?',
      choices: [
        { id: 'a', text: 'Berlin' },
        { id: 'b', text: 'Paris' },
        { id: 'c', text: 'Madrid' },
      ],
      answer: 'b',
      explanation: 'Paris is the capital of France.',
    },
  ],
};

describe('parseQuiz', () => {
  it('parses valid multiple choice quiz', () => {
    const result = parseQuiz(validMultipleChoice);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.id).toBe('capital-quiz');
      expect(result.data.title).toBe('Capital Quiz');
      expect(result.data.questions).toHaveLength(1);
      expect(result.data.questions[0].type).toBe('multiple_choice');
      expect(result.data.questions[0].answer).toBe('b');
    }
  });

  it('rejects invalid choice data', () => {
    const result = parseQuiz({
      id: 'x',
      title: 'X',
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          prompt: '?',
          choices: [{ id: 'a' }],
          answer: 'a',
        },
      ],
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.some((e) => e.path.includes('text'))).toBe(true);
    }
  });

  it('rejects missing required fields', () => {
    const result = parseQuiz({});
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors.some((e) => e.path === 'id' || e.message.includes('id'))).toBe(true);
      expect(result.errors.some((e) => e.path === 'title' || e.message.includes('title'))).toBe(
        true
      );
      expect(
        result.errors.some((e) => e.path === 'questions' || e.message.includes('questions'))
      ).toBe(true);
    }
  });

  it('rejects invalid question type', () => {
    const result = parseQuiz({
      id: 'x',
      title: 'X',
      questions: [
        {
          id: 'q1',
          type: 'drag_drop',
          prompt: '?',
          answer: 'x',
        },
      ],
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.some((e) => e.message.includes('type') || e.path.includes('type'))).toBe(
        true
      );
    }
  });

  it('rejects invalid answer shape for multiple_choice', () => {
    const result = parseQuiz({
      id: 'x',
      title: 'X',
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          prompt: '?',
          choices: [
            { id: 'a', text: 'A' },
            { id: 'b', text: 'B' },
          ],
          answer: 'c',
        },
      ],
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.some((e) => e.path.includes('answer'))).toBe(true);
    }
  });

  it('returns human-readable validation errors', () => {
    const result = parseQuiz({ id: '', title: 1, questions: null });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.every((e) => typeof e.path === 'string' && typeof e.message === 'string')).toBe(true);
    }
  });
});

describe('validateQuiz', () => {
  it('accepts valid quiz', () => {
    const parsed = parseQuiz(validMultipleChoice);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      const result = validateQuiz(parsed.data);
      expect(result.valid).toBe(true);
    }
  });

  it('rejects duplicate question ids', () => {
    const parsed = parseQuiz({
      id: 'x',
      title: 'X',
      questions: [
        {
          id: 'q1',
          type: 'text_input',
          prompt: '?',
          answer: 'a',
        },
        {
          id: 'q1',
          type: 'text_input',
          prompt: '?',
          answer: 'b',
        },
      ],
    });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      const result = validateQuiz(parsed.data);
      expect(result.valid).toBe(false);
      if (!result.valid) {
        expect(result.errors.some((e) => e.message.includes('Duplicate'))).toBe(true);
      }
    }
  });
});

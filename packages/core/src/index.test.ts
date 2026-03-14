import { describe, it, expect } from 'vitest';
import { parseQuiz } from '@quizparts/schema';
import {
  CORE_VERSION,
  createQuizSession,
  selectChoice,
  toggleChoice,
  setTextInput,
  setOrderedIds,
  submitAnswer,
  goToNextQuestion,
  goToPreviousQuestion,
  getProgress,
  resetQuiz,
  checkCorrectness,
} from './index.js';

const validQuiz = parseQuiz({
  id: 'test-quiz',
  title: 'Test Quiz',
  questions: [
    {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'What is 2+2?',
      choices: [
        { id: 'a', text: '3' },
        { id: 'b', text: '4' },
        { id: 'c', text: '5' },
      ],
      answer: 'b',
    },
    {
      id: 'q2',
      type: 'text_input',
      prompt: 'Say "hello"',
      answer: 'hello',
    },
  ],
});

describe('@quizparts/core', () => {
  it('exports CORE_VERSION', () => {
    expect(CORE_VERSION).toBe('0.0.1');
  });

  it('creates session from parsed quiz', () => {
    if (!validQuiz.success) throw new Error('parse failed');
    const session = createQuizSession(validQuiz.data);
    expect(session.quiz.questions).toHaveLength(2);
    expect(session.currentQuestionIndex).toBe(0);
    expect(session.score).toBe(0);
    expect(session.questionStates[0]!.status).toBe('active');
    expect(session.questionStates[1]!.status).toBe('idle');
  });

  it('selecting an answer updates state', () => {
    if (!validQuiz.success) throw new Error('parse failed');
    const session = createQuizSession(validQuiz.data);
    const next = selectChoice(session, 0, 'b');
    expect(next.questionStates[0]!.input.selectedChoiceId).toBe('b');
  });

  it('submitting correct answer returns correct and updates score', () => {
    if (!validQuiz.success) throw new Error('parse failed');
    let session = createQuizSession(validQuiz.data);
    session = selectChoice(session, 0, 'b');
    const { session: after, correct } = submitAnswer(session);
    expect(correct).toBe(true);
    expect(after.score).toBe(1);
    expect(after.questionStates[0]!.status).toBe('correct');
  });

  it('submitting incorrect answer returns incorrect', () => {
    if (!validQuiz.success) throw new Error('parse failed');
    let session = createQuizSession(validQuiz.data);
    session = selectChoice(session, 0, 'a');
    const { session: after, correct } = submitAnswer(session);
    expect(correct).toBe(false);
    expect(after.score).toBe(0);
    expect(after.questionStates[0]!.status).toBe('incorrect');
  });

  it('progression: goToNextQuestion advances index and marks current complete', () => {
    if (!validQuiz.success) throw new Error('parse failed');
    let session = createQuizSession(validQuiz.data);
    session = selectChoice(session, 0, 'b');
    const { session: afterSubmit } = submitAnswer(session);
    const afterNext = goToNextQuestion(afterSubmit);
    expect(afterNext.currentQuestionIndex).toBe(1);
    expect(afterNext.questionStates[0]!.status).toBe('complete');
    expect(afterNext.questionStates[1]!.status).toBe('active');
  });

  it('getProgress returns currentIndex, total, score, attemptedCount', () => {
    if (!validQuiz.success) throw new Error('parse failed');
    let session = createQuizSession(validQuiz.data);
    let progress = getProgress(session);
    expect(progress.currentIndex).toBe(0);
    expect(progress.total).toBe(2);
    expect(progress.score).toBe(0);
    expect(progress.attemptedCount).toBe(0);
    expect(progress.canGoNext).toBe(true);
    expect(progress.canGoPrevious).toBe(false);

    session = selectChoice(session, 0, 'b');
    const { session: after } = submitAnswer(session);
    progress = getProgress(after);
    expect(progress.score).toBe(1);
    expect(progress.attemptedCount).toBe(1);
  });

  it('reset restores initial state', () => {
    if (!validQuiz.success) throw new Error('parse failed');
    let session = createQuizSession(validQuiz.data);
    session = selectChoice(session, 0, 'b');
    const { session: afterSubmit } = submitAnswer(session);
    const afterReset = resetQuiz(afterSubmit);
    expect(afterReset.currentQuestionIndex).toBe(0);
    expect(afterReset.score).toBe(0);
    expect(afterReset.attemptedCount).toBe(0);
    expect(afterReset.questionStates[0]!.status).toBe('active');
    expect(afterReset.questionStates[0]!.input.selectedChoiceId).toBeUndefined();
  });

  it('text_input: setTextInput and submit correct answer', () => {
    if (!validQuiz.success) throw new Error('parse failed');
    let session = createQuizSession(validQuiz.data);
    session = goToNextQuestion(session);
    session = setTextInput(session, 1, 'hello');
    const { session: after, correct } = submitAnswer(session);
    expect(correct).toBe(true);
    expect(after.score).toBe(1);
  });

  it('goToPreviousQuestion goes back', () => {
    if (!validQuiz.success) throw new Error('parse failed');
    let session = createQuizSession(validQuiz.data);
    session = goToNextQuestion(session);
    expect(session.currentQuestionIndex).toBe(1);
    const back = goToPreviousQuestion(session);
    expect(back.currentQuestionIndex).toBe(0);
    expect(back.questionStates[0]!.status).toBe('active');
  });

  it('toggleChoice adds and removes selection for multi_select', () => {
    const multiQuiz = parseQuiz({
      id: 'm',
      title: 'M',
      questions: [
        {
          id: 'q1',
          type: 'multi_select',
          prompt: '?',
          choices: [
            { id: 'a', text: 'A' },
            { id: 'b', text: 'B' },
          ],
          answer: ['a'],
        },
      ],
    });
    if (!multiQuiz.success) throw new Error('parse failed');
    let session = createQuizSession(multiQuiz.data);
    session = toggleChoice(session, 0, 'a');
    expect(session.questionStates[0]!.input.selectedChoiceIds).toEqual(['a']);
    session = toggleChoice(session, 0, 'b');
    expect(session.questionStates[0]!.input.selectedChoiceIds).toContain('a');
    expect(session.questionStates[0]!.input.selectedChoiceIds).toContain('b');
    session = toggleChoice(session, 0, 'a');
    expect(session.questionStates[0]!.input.selectedChoiceIds).not.toContain('a');
    expect(session.questionStates[0]!.input.selectedChoiceIds).toContain('b');
  });

  it('checkCorrectness: text_input caseInsensitive', () => {
    const q = {
      type: 'text_input' as const,
      id: 'q1',
      prompt: '?',
      answer: 'Hello',
      caseInsensitive: true,
    };
    expect(checkCorrectness(q, { text: 'hello' })).toBe(true);
    expect(checkCorrectness(q, { text: 'HELLO' })).toBe(true);
    expect(checkCorrectness(q, { text: 'hi' })).toBe(false);
  });

  it('checkCorrectness: multi_select', () => {
    const q = {
      type: 'multi_select' as const,
      id: 'q1',
      prompt: '?',
      choices: [{ id: 'a', text: 'A' }, { id: 'b', text: 'B' }],
      answer: ['a', 'b'],
    };
    expect(checkCorrectness(q, { selectedChoiceIds: ['a', 'b'] })).toBe(true);
    expect(checkCorrectness(q, { selectedChoiceIds: ['b', 'a'] })).toBe(true);
    expect(checkCorrectness(q, { selectedChoiceIds: ['a'] })).toBe(false);
    expect(checkCorrectness(q, { selectedChoiceIds: ['a', 'b', 'a'] })).toBe(false);
  });

  it('setOrderedIds and submit correct order_items', () => {
    const orderQuiz = parseQuiz({
      id: 'o',
      title: 'O',
      questions: [
        {
          id: 'q1',
          type: 'order_items',
          prompt: 'Order',
          items: [
            { id: '1', text: 'One' },
            { id: '2', text: 'Two' },
          ],
          answer: ['1', '2'],
        },
      ],
    });
    if (!orderQuiz.success) throw new Error('parse failed');
    let session = createQuizSession(orderQuiz.data);
    session = setOrderedIds(session, 0, ['1', '2']);
    const { correct } = submitAnswer(session);
    expect(correct).toBe(true);
  });
});

import { describe, it, expect } from 'vitest';
import { parseQuiz } from '@quizparts/schema';
import {
  CORE_VERSION,
  createQuizSession,
  selectChoice,
  setTextInput,
  submitAnswer,
  goToNextQuestion,
  goToPreviousQuestion,
  getProgress,
  resetQuiz,
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
});

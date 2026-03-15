/** Session actions - pure, immutable updates */

import type { QuizSession, QuestionState } from './state.js';
import { checkCorrectness } from './correctness.js';

const cloneStates = (states: QuestionState[]): QuestionState[] =>
  states.map((s) => ({ ...s, input: { ...s.input } }));

/** Select a single choice (multiple_choice). Replaces current selection. */
export const selectChoice = (
  session: QuizSession,
  questionIndex: number,
  choiceId: string
): QuizSession => {
  if (questionIndex < 0 || questionIndex >= session.questionStates.length) {
    return session;
  }
  const next = cloneStates(session.questionStates);
  next[questionIndex] = {
    ...next[questionIndex]!,
    input: { ...next[questionIndex]!.input, selectedChoiceId: choiceId },
  };
  return { ...session, questionStates: next };
};

/** Toggle a choice (multi_select). Adds or removes choiceId. */
export const toggleChoice = (
  session: QuizSession,
  questionIndex: number,
  choiceId: string
): QuizSession => {
  if (questionIndex < 0 || questionIndex >= session.questionStates.length) {
    return session;
  }
  const curr = session.questionStates[questionIndex]!.input.selectedChoiceIds ?? [];
  const set = new Set(curr);
  if (set.has(choiceId)) set.delete(choiceId);
  else set.add(choiceId);
  const next = cloneStates(session.questionStates);
  next[questionIndex] = {
    ...next[questionIndex]!,
    input: { ...next[questionIndex]!.input, selectedChoiceIds: [...set] },
  };
  return { ...session, questionStates: next };
};

/** Set text input (text_input). */
export const setTextInput = (
  session: QuizSession,
  questionIndex: number,
  text: string
): QuizSession => {
  if (questionIndex < 0 || questionIndex >= session.questionStates.length) {
    return session;
  }
  const next = cloneStates(session.questionStates);
  next[questionIndex] = {
    ...next[questionIndex]!,
    input: { ...next[questionIndex]!.input, text },
  };
  return { ...session, questionStates: next };
};

/** Set match pairs (match_pairs). */
export const setMatchPairs = (
  session: QuizSession,
  questionIndex: number,
  pairs: Array<[string, string]>
): QuizSession => {
  if (questionIndex < 0 || questionIndex >= session.questionStates.length) {
    return session;
  }
  const next = cloneStates(session.questionStates);
  next[questionIndex] = {
    ...next[questionIndex]!,
    input: { ...next[questionIndex]!.input, matchPairs: pairs },
  };
  return { ...session, questionStates: next };
};

/** Set ordered ids (order_items). */
export const setOrderedIds = (
  session: QuizSession,
  questionIndex: number,
  orderedIds: string[]
): QuizSession => {
  if (questionIndex < 0 || questionIndex >= session.questionStates.length) {
    return session;
  }
  const next = cloneStates(session.questionStates);
  next[questionIndex] = {
    ...next[questionIndex]!,
    input: { ...next[questionIndex]!.input, orderedIds },
  };
  return { ...session, questionStates: next };
};

/** Set sentence order (sentence_builder). */
export const setSentenceOrder = (
  session: QuizSession,
  questionIndex: number,
  sentenceOrder: string[]
): QuizSession => {
  if (questionIndex < 0 || questionIndex >= session.questionStates.length) {
    return session;
  }
  const next = cloneStates(session.questionStates);
  next[questionIndex] = {
    ...next[questionIndex]!,
    input: { ...next[questionIndex]!.input, sentenceOrder },
  };
  return { ...session, questionStates: next };
};

/** Submit the current question. Returns new session and whether the answer was correct. */
export const submitAnswer = (
  session: QuizSession
): { session: QuizSession; correct: boolean } => {
  const idx = session.currentQuestionIndex;
  if (idx < 0 || idx >= session.quiz.questions.length) {
    return { session, correct: false };
  }
  const question = session.quiz.questions[idx]!;
  const input = session.questionStates[idx]!.input;
  const correct = checkCorrectness(question, input);
  const next = cloneStates(session.questionStates);
  next[idx] = {
    ...next[idx]!,
    status: correct ? 'correct' : 'incorrect',
    isCorrect: correct,
  };
  const newSession: QuizSession = {
    ...session,
    questionStates: next,
    score: session.score + (correct ? 1 : 0),
    attemptedCount: session.attemptedCount + 1,
  };
  return { session: newSession, correct };
};

/** Move to the next question. Marks current as complete and next as active. */
export const goToNextQuestion = (session: QuizSession): QuizSession => {
  const idx = session.currentQuestionIndex;
  const next = cloneStates(session.questionStates);
  if (idx >= 0 && idx < next.length) {
    next[idx] = { ...next[idx]!, status: 'complete' };
  }
  const nextIndex = Math.min(idx + 1, session.quiz.questions.length);
  if (nextIndex < next.length) {
    next[nextIndex] = { ...next[nextIndex]!, status: 'active' };
  }
  return {
    ...session,
    currentQuestionIndex: nextIndex,
    questionStates: next,
  };
};

/** Move to the previous question. */
export const goToPreviousQuestion = (session: QuizSession): QuizSession => {
  const idx = session.currentQuestionIndex;
  if (idx <= 0) return session;
  const next = cloneStates(session.questionStates);
  if (idx < next.length) {
    next[idx] = { ...next[idx]!, status: 'idle' };
  }
  const prevIndex = idx - 1;
  next[prevIndex] = { ...next[prevIndex]!, status: 'active' };
  return {
    ...session,
    currentQuestionIndex: prevIndex,
    questionStates: next,
  };
};

/** Progress info for the current session */
export interface Progress {
  currentIndex: number;
  total: number;
  score: number;
  attemptedCount: number;
  isComplete: boolean;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export const getProgress = (session: QuizSession): Progress => {
  const total = session.quiz.questions.length;
  const current = session.currentQuestionIndex;
  const isComplete = total === 0 || (current >= total && session.attemptedCount >= total);
  return {
    currentIndex: current,
    total,
    score: session.score,
    attemptedCount: session.attemptedCount,
    isComplete,
    canGoNext: current < total,
    canGoPrevious: current > 0,
  };
};

/** Reset session to initial state. */
export const resetQuiz = (session: QuizSession): QuizSession => {
  const s: QuizSession = {
    ...session,
    currentQuestionIndex: 0,
    questionStates: session.quiz.questions.map(() => ({
      status: 'idle' as const,
      input: {},
    })),
    score: 0,
    attemptedCount: 0,
  };
  if (s.questionStates.length > 0) {
    const next = cloneStates(s.questionStates);
    next[0] = { ...next[0]!, status: 'active' };
    return { ...s, questionStates: next };
  }
  return s;
};

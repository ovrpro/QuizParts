import { useMemo } from 'react';
import { useQuizContext } from './useQuizContext.js';

/**
 * Quiz-level state and actions. Use inside QuizProvider.
 */
export const useQuiz = () => {
  const { session, progress, submitAnswer, goToNextQuestion, goToPreviousQuestion, resetQuiz } =
    useQuizContext();

  const currentQuestionIndex = session.currentQuestionIndex;
  const currentQuestion =
    session.quiz.questions[currentQuestionIndex] ?? null;
  const questionCount = session.quiz.questions.length;

  const canSubmit = useMemo(() => {
    const q = currentQuestion;
    const state = session.questionStates[currentQuestionIndex];
    if (!q || !state) return false;
    if (state.status === 'correct' || state.status === 'incorrect') return false;
    if (q.type === 'multiple_choice') {
      return typeof state.input.selectedChoiceId === 'string' && state.input.selectedChoiceId.length > 0;
    }
    if (q.type === 'multi_select') {
      const ids = state.input.selectedChoiceIds ?? [];
      return ids.length > 0;
    }
    if (q.type === 'text_input') {
      return typeof state.input.text === 'string' && state.input.text.trim().length > 0;
    }
    if (q.type === 'match_pairs') {
      const pairs = state.input.matchPairs ?? [];
      return 'pairs' in q && Array.isArray(q.pairs) && pairs.length === q.pairs.length;
    }
    if (q.type === 'order_items') {
      const ordered = state.input.orderedIds ?? [];
      return 'items' in q && Array.isArray(q.items) && ordered.length === q.items.length;
    }
    if (q.type === 'sentence_builder') {
      const order = state.input.sentenceOrder ?? [];
      return 'answer' in q && Array.isArray(q.answer) && order.length === q.answer.length;
    }
    return false;
  }, [session, currentQuestionIndex, currentQuestion]);

  const isComplete = questionCount > 0 && progress.attemptedCount >= questionCount;

  return {
    quiz: session.quiz,
    currentQuestion,
    currentQuestionIndex,
    questionCount,
    canSubmit,
    isComplete,
    score: session.score,
    canGoNext: progress.canGoNext,
    canGoPrevious: progress.canGoPrevious,
    goToNextQuestion,
    goToPreviousQuestion,
    submitAnswer,
    resetQuiz,
  };
};

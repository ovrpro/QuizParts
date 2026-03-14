import { useMemo } from 'react';
import { useQuizContext } from './useQuizContext.js';

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
    if (q.type === 'text_input') {
      return typeof state.input.text === 'string' && state.input.text.trim().length > 0;
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

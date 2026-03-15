import { useQuizContext } from './useQuizContext.js';

/**
 * Progress for the current quiz. Use inside QuizProvider.
 * @returns current, total, percent, answeredCount, score, canGoNext, canGoPrevious, isComplete.
 */
export const useProgress = () => {
  const { progress } = useQuizContext();
  const total = progress.total;
  const current = progress.currentIndex + 1;
  const percent = total > 0 ? Math.round((progress.attemptedCount / total) * 100) : 0;
  return {
    current,
    total,
    percent,
    answeredCount: progress.attemptedCount,
    remainingCount: Math.max(0, total - progress.attemptedCount),
    score: progress.score,
    canGoNext: progress.canGoNext,
    canGoPrevious: progress.canGoPrevious,
    isComplete: progress.attemptedCount >= total && total > 0,
  };
};

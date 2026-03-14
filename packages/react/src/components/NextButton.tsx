import type { ReactNode } from 'react';
import { useQuiz } from '../hooks/useQuiz.js';

export interface NextButtonProps {
  children?: ReactNode;
}

export const NextButton = ({ children = 'Next' }: NextButtonProps) => {
  const { canGoNext, goToNextQuestion } = useQuiz();
  return (
    <button
      type="button"
      data-quiz-next
      {...(!canGoNext && { 'data-disabled': true })}
      disabled={!canGoNext}
      onClick={() => canGoNext && goToNextQuestion()}
    >
      {children}
    </button>
  );
};

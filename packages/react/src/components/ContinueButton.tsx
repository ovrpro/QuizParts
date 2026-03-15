import type { ReactNode } from 'react';
import { useQuiz } from '../hooks/useQuiz.js';

export interface ContinueButtonProps {
  children?: ReactNode;
}

/** Advances to the next question after submit. Same behavior as NextButton; default label "Continue". */
export const ContinueButton = ({ children = 'Continue' }: ContinueButtonProps) => {
  const { canGoNext, goToNextQuestion } = useQuiz();
  return (
    <button
      type="button"
      data-quiz-continue
      {...(!canGoNext && { 'data-disabled': true })}
      disabled={!canGoNext}
      onClick={() => canGoNext && goToNextQuestion()}
    >
      {children}
    </button>
  );
};

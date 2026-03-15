import type { ReactNode } from 'react';
import { useQuiz } from '../hooks/useQuiz.js';

export interface SubmitButtonProps {
  children?: ReactNode;
}

/** Submit button for the current question. Disabled until input is valid; use with useQuiz().canSubmit. */
export const SubmitButton = ({ children = 'Answer' }: SubmitButtonProps) => {
  const { canSubmit, submitAnswer } = useQuiz();
  return (
    <button
      type="button"
      data-quiz-submit
      {...(!canSubmit && { 'data-disabled': true })}
      disabled={!canSubmit}
      onClick={() => canSubmit && submitAnswer()}
    >
      {children}
    </button>
  );
};

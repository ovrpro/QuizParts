import type { ReactNode } from 'react';
import { useQuiz } from '../hooks/useQuiz.js';

export interface SubmitButtonProps {
  children?: ReactNode;
}

export const SubmitButton = ({ children = 'Submit' }: SubmitButtonProps) => {
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

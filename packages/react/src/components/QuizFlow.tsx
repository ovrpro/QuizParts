import type { ReactNode } from 'react';
import { useQuiz } from '../hooks/useQuiz.js';
import { Question } from './Question.js';
import { DefaultQuestionLayout } from './DefaultQuestionLayout.js';
import { QuizComplete } from './QuizComplete.js';

export interface QuizFlowProps {
  /** Shown when quiz is complete. */
  completeTitle?: ReactNode;
  /** Optional message when complete. */
  completeMessage?: ReactNode;
  /** Reset button label when complete (default "Start again"). */
  resetLabel?: string;
  /** Optional hint below the question input. */
  hint?: ReactNode;
  /** Submit button label before answer (default "Answer"). */
  submitLabel?: ReactNode;
  /** Skip button label before answer (default "Skip"). Hidden after submit. */
  continueLabel?: ReactNode;
  /** Next button label after submit (default "Next"). */
  nextLabel?: ReactNode;
  /** Whether choices show the indicator (default true). */
  showChoiceIndicator?: boolean;
  /** Fallback when there is no current question (e.g. empty quiz). */
  emptyFallback?: ReactNode;
}

/** Renders the full quiz flow: complete screen or default question layout. Use inside QuizProvider + QuizRoot. */
export const QuizFlow = ({
  completeTitle = 'Quiz complete!',
  completeMessage,
  resetLabel = 'Start again',
  hint,
  submitLabel = 'Answer',
  continueLabel = 'Skip',
  nextLabel = 'Next',
  showChoiceIndicator = true,
  emptyFallback = null,
}: QuizFlowProps) => {
  const { currentQuestion, isComplete } = useQuiz();

  if (isComplete) {
    return (
      <QuizComplete
        title={completeTitle}
        message={completeMessage}
        resetLabel={resetLabel}
      />
    );
  }

  if (!currentQuestion) return <>{emptyFallback}</>;

  return (
    <Question>
      <DefaultQuestionLayout
        hint={hint}
        submitLabel={submitLabel}
        continueLabel={continueLabel}
        nextLabel={nextLabel}
        showChoiceIndicator={showChoiceIndicator}
      />
    </Question>
  );
};

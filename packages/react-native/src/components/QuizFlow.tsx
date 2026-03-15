import type { ReactNode } from 'react';
import { useQuiz } from '../hooks/useQuiz.js';
import { Question } from './Question.js';
import { DefaultQuestionLayout } from './DefaultQuestionLayout.js';
import { QuizComplete } from './QuizComplete.js';

export interface QuizFlowProps {
  completeTitle?: ReactNode;
  completeMessage?: ReactNode;
  resetLabel?: string;
  hint?: ReactNode;
  submitLabel?: ReactNode;
  continueLabel?: ReactNode;
  nextLabel?: ReactNode;
  showChoiceIndicator?: boolean;
  emptyFallback?: ReactNode;
}

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

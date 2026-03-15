import type { ReactNode } from 'react';
import { useQuestion } from '../hooks/useQuestion.js';
import { QuestionCard } from './QuestionCard.js';
import { QuestionHeader } from './QuestionHeader.js';
import { QuestionBody } from './QuestionBody.js';
import { QuestionFooter } from './QuestionFooter.js';
import { ProgressBar } from './ProgressBar.js';
import { QuestionCounter } from './QuestionCounter.js';
import { Prompt } from './Prompt.js';
import { QuestionInput } from './QuestionInput.js';
import { Hint } from './Hint.js';
import { SubmitButton } from './SubmitButton.js';
import { ContinueButton } from './ContinueButton.js';
import { NextButton } from './NextButton.js';
import { Feedback } from './Feedback.js';

export interface DefaultQuestionLayoutProps {
  /** Optional hint below the input (string or node). */
  hint?: ReactNode;
  /** Submit button label (default "Answer"). */
  submitLabel?: ReactNode;
  /** Skip button label before submit (default "Skip"). */
  continueLabel?: ReactNode;
  /** Next button label after submit (default "Next"). Shown in place of Answer + Skip. */
  nextLabel?: ReactNode;
  /** Whether choices show the indicator (default true). */
  showChoiceIndicator?: boolean;
}

/** Default question layout: before submit shows Answer + Skip; after submit shows only Next so users get used to that button. */
export const DefaultQuestionLayout = ({
  hint,
  submitLabel = 'Answer',
  continueLabel = 'Skip',
  nextLabel = 'Next',
  showChoiceIndicator = true,
}: DefaultQuestionLayoutProps) => {
  const { isSubmitted } = useQuestion();
  return (
    <QuestionCard>
      <QuestionHeader>
        <ProgressBar />
        <QuestionCounter />
      </QuestionHeader>
      <QuestionBody>
        <Prompt />
        <QuestionInput showChoiceIndicator={showChoiceIndicator} />
        {hint != null && (typeof hint === 'string' ? <Hint hint={hint} /> : <Hint>{hint}</Hint>)}
      </QuestionBody>
      <QuestionFooter>
        {!isSubmitted ? (
          <>
            <SubmitButton>{submitLabel}</SubmitButton>
            <ContinueButton>{continueLabel}</ContinueButton>
          </>
        ) : (
          <NextButton>{nextLabel}</NextButton>
        )}
        <Feedback />
      </QuestionFooter>
    </QuestionCard>
  );
};

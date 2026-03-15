import type { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { useQuestion } from '../hooks/useQuestion.js';
import { useTheme } from '../theme/ThemeContext.js';
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
  hint?: ReactNode;
  submitLabel?: ReactNode;
  continueLabel?: ReactNode;
  nextLabel?: ReactNode;
  showChoiceIndicator?: boolean;
}

export const DefaultQuestionLayout = ({
  hint,
  submitLabel = 'Answer',
  continueLabel = 'Skip',
  nextLabel = 'Next',
  showChoiceIndicator = true,
}: DefaultQuestionLayoutProps) => {
  const { isSubmitted } = useQuestion();
  const theme = useTheme();
  const footerButtonRow = StyleSheet.create({
    row: { flexDirection: 'row', gap: theme.spacing.md, flexWrap: 'wrap' },
  });
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
        <View style={footerButtonRow.row}>
          {!isSubmitted ? (
            <>
              <SubmitButton>{submitLabel}</SubmitButton>
              <ContinueButton>{continueLabel}</ContinueButton>
            </>
          ) : (
            <NextButton>{nextLabel}</NextButton>
          )}
        </View>
        <Feedback />
      </QuestionFooter>
    </QuestionCard>
  );
};

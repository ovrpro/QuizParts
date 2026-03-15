import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useQuestion } from '../hooks/useQuestion.js';

export interface ChoicesProps {
  children: ReactNode;
}

export const Choices = ({ children }: ChoicesProps) => {
  const { question } = useQuestion();
  if (!question || (question.type !== 'multiple_choice' && question.type !== 'multi_select'))
    return null;
  return (
    <View testID="quiz-choices" accessibilityLabel="Choices">
      {children}
    </View>
  );
};

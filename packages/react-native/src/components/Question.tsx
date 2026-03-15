import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useQuestion } from '../hooks/useQuestion.js';

export interface QuestionProps {
  children?: ReactNode;
}

export const Question = ({ children }: QuestionProps) => {
  const { question, status } = useQuestion();
  if (!question) return null;
  return (
    <View testID="quiz-question" accessibilityLabel={`Question ${question.id} ${status}`}>
      {children}
    </View>
  );
};

import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useQuizContext } from '../hooks/useQuizContext.js';

export interface QuizRootProps {
  children: ReactNode;
}

export const QuizRoot = ({ children }: QuizRootProps) => {
  useQuizContext();
  return <View>{children}</View>;
};

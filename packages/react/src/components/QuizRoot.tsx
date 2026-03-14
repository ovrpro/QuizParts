import type { ReactNode } from 'react';
import { useQuizContext } from '../hooks/useQuizContext.js';

export interface QuizRootProps {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

export const QuizRoot = ({ children, as: Component = 'div' }: QuizRootProps) => {
  useQuizContext();
  return <Component data-quiz-root>{children}</Component>;
};

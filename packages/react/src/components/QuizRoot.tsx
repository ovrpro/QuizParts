import type { ReactNode } from 'react';
import { useQuizContext } from '../hooks/useQuizContext.js';

export interface QuizRootProps {
  children: ReactNode;
  /** Root element (default 'div'). Use for semantics or to attach data-quiz-root to a section. */
  as?: keyof JSX.IntrinsicElements;
}

/** Wrapper that marks the quiz UI root (theme targets data-quiz-root). Must be inside QuizProvider. */
export const QuizRoot = ({ children, as: Component = 'div' }: QuizRootProps) => {
  useQuizContext();
  return <Component data-quiz-root>{children}</Component>;
};

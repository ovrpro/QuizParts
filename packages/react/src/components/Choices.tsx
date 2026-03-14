import type { ReactNode } from 'react';
import { useQuestion } from '../hooks/useQuestion.js';

export interface ChoicesProps {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

export const Choices = ({ children, as: Component = 'div' }: ChoicesProps) => {
  const { question } = useQuestion();
  if (!question || (question.type !== 'multiple_choice' && question.type !== 'multi_select'))
    return null;
  return (
    <Component data-quiz-choices role="listbox" aria-label="Choices">
      {children}
    </Component>
  );
};

import type { ReactNode } from 'react';
import { useQuestion } from '../hooks/useQuestion.js';

export interface QuestionProps {
  children?: ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

export const Question = ({ children, as: Component = 'div' }: QuestionProps) => {
  const { question, status } = useQuestion();
  if (!question) return null;
  return (
    <Component
      data-quiz-question
      data-question-id={question.id}
      data-question-type={question.type}
      data-status={status}
    >
      {children}
    </Component>
  );
};

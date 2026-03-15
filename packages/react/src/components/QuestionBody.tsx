import type { ReactNode } from 'react';

export interface QuestionBodyProps {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

/** Middle content area (prompt, instruction, choices, inputs). */
export const QuestionBody = ({
  children,
  as: Component = 'div',
}: QuestionBodyProps) => (
  <Component data-quiz-question-body>{children}</Component>
);

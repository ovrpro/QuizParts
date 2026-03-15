import type { ReactNode } from 'react';

export interface QuestionHeaderProps {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

/** Top area of a question card (counter, progress, prompt, media). */
export const QuestionHeader = ({
  children,
  as: Component = 'header',
}: QuestionHeaderProps) => (
  <Component data-quiz-question-header>{children}</Component>
);

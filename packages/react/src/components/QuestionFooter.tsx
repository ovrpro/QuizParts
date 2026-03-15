import type { ReactNode } from 'react';

export interface QuestionFooterProps {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

/** Bottom area for actions and feedback (submit, continue, retry, feedback). */
export const QuestionFooter = ({
  children,
  as: Component = 'footer',
}: QuestionFooterProps) => (
  <Component data-quiz-question-footer>{children}</Component>
);

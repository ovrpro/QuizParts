import type { ReactNode } from 'react';

export interface QuestionCardProps {
  children: ReactNode;
  /** Root element (default 'div'). Use for semantics or React Native. */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

/** Layout wrapper for the main question surface. Theme targets data-quiz-question-card. */
export const QuestionCard = ({
  children,
  as: Component = 'div',
  className,
}: QuestionCardProps) => (
  <Component data-quiz-question-card className={className}>
    {children}
  </Component>
);

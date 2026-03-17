import type { ReactNode } from 'react';

export interface CardProps {
  /** Optional heading for the card. */
  title?: string;
  /** Card body content. */
  children: ReactNode;
  /** Root element (default 'section'). Use for semantics. */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

/** General-purpose presentational card. Theme targets data-quiz-card. */
export const Card = ({
  title,
  children,
  as: Component = 'section',
  className,
}: CardProps) => (
  <Component data-quiz-card className={className}>
    {title != null && title !== '' ? (
      <>
        <h3 data-quiz-card-title>{title}</h3>
        <div data-quiz-card-body>{children}</div>
      </>
    ) : (
      <div data-quiz-card-body>{children}</div>
    )}
  </Component>
);

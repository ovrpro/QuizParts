import type { ReactNode } from 'react';
import { useQuiz } from '../hooks/useQuiz.js';

export interface QuizCompleteProps {
  /** Heading (default "Quiz complete!"). */
  title?: ReactNode;
  /** Optional message below the title. */
  message?: ReactNode;
  /** Label for the reset button (default "Start again"). */
  resetLabel?: string;
  /** Called when reset is clicked; defaults to resetQuiz from context. */
  onReset?: () => void;
  /** Custom content instead of title/message/reset. */
  children?: ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

/** Renders when the quiz is complete. Use inside QuizProvider; shows title, optional message, and reset button. */
export const QuizComplete = ({
  title = 'Quiz complete!',
  message,
  resetLabel = 'Start again',
  onReset,
  children,
  as: Component = 'div',
}: QuizCompleteProps) => {
  const { isComplete, resetQuiz } = useQuiz();
  if (!isComplete) return null;

  const handleReset = onReset ?? resetQuiz;

  if (children != null) {
    return <Component data-quiz-complete>{children}</Component>;
  }

  return (
    <Component data-quiz-complete style={{ padding: '1.5rem', textAlign: 'center' } as React.CSSProperties}>
      {title != null && (typeof title === 'string' ? <h2>{title}</h2> : title)}
      {message != null && (typeof message === 'string' ? <p>{message}</p> : message)}
      <button type="button" onClick={() => handleReset()} style={{ marginTop: '1rem' }}>
        {resetLabel}
      </button>
    </Component>
  );
};

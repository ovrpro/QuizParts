import { useProgress } from '../hooks/useProgress.js';

export interface QuestionCounterProps {
  /** Custom format: "{current}" and "{total}" are replaced. Default "Question {current} of {total}". */
  format?: string;
  children?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

const DEFAULT_FORMAT = 'Question {current} of {total}';

/** Displays current question index and total (e.g. "Question 3 of 10"). */
export const QuestionCounter = ({
  format = DEFAULT_FORMAT,
  children,
  as: Component = 'span',
}: QuestionCounterProps) => {
  const { current, total } = useProgress();
  const text = format.replace('{current}', String(current)).replace('{total}', String(total));
  return (
    <Component data-quiz-question-counter aria-live="polite">
      {children ?? text}
    </Component>
  );
};

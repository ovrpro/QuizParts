import { useProgress } from '../hooks/useProgress.js';

export interface ProgressProps {
  as?: keyof JSX.IntrinsicElements;
}

export const Progress = ({ as: Component = 'div' }: ProgressProps) => {
  const { current, total, percent, score } = useProgress();
  return (
    <Component
      data-quiz-progress
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Question ${current} of ${total}`}
    >
      <span data-quiz-progress-text>
        {current} / {total}
      </span>
      <span data-quiz-progress-percent>{percent}%</span>
      <span data-quiz-progress-score>Score: {score}</span>
    </Component>
  );
};

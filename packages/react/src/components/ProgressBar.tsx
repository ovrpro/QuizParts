import { useProgress } from '../hooks/useProgress.js';

export interface ProgressBarProps {
  as?: keyof JSX.IntrinsicElements;
}

/** Visual progress track and fill. Use progress from useProgress; theme targets data-quiz-progress-bar. */
export const ProgressBar = ({ as: Component = 'div' }: ProgressBarProps) => {
  const { percent } = useProgress();
  return (
    <Component
      data-quiz-progress-bar
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span data-quiz-progress-bar-track />
      <span
        data-quiz-progress-bar-fill
        style={{ width: `${percent}%` }}
      />
    </Component>
  );
};

import { useQuestion } from '../hooks/useQuestion.js';

export interface FeedbackProps {
  as?: keyof JSX.IntrinsicElements;
}

export const Feedback = ({ as: Component = 'div' }: FeedbackProps) => {
  const { feedback, isSubmitted } = useQuestion();
  if (!isSubmitted || !feedback) return null;
  return (
    <Component
      data-quiz-feedback
      data-correct={feedback.isCorrect || undefined}
      data-incorrect={!feedback.isCorrect || undefined}
      role="status"
    >
      {feedback.isCorrect ? 'Correct!' : 'Incorrect.'}
      {feedback.explanation != null && feedback.explanation !== '' && (
        <p data-quiz-explanation>{feedback.explanation}</p>
      )}
    </Component>
  );
};

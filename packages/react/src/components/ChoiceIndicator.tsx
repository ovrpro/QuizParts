import { useQuestion } from '../hooks/useQuestion.js';

export interface ChoiceIndicatorProps {
  /** Id of the choice this indicator belongs to (must match Choice choiceId). */
  choiceId: string;
  /** 'radio' for single select, 'checkbox' for multi select. */
  variant?: 'radio' | 'checkbox';
  as?: keyof JSX.IntrinsicElements;
}

/** Visual or semantic marker for choice state (selected, correct, incorrect). Use inside Choice. */
export const ChoiceIndicator = ({
  choiceId,
  variant = 'radio',
  as: Component = 'span',
}: ChoiceIndicatorProps) => {
  const { question, selectedChoiceId, selectedChoiceIds, isSubmitted } = useQuestion();
  if (!question || (question.type !== 'multiple_choice' && question.type !== 'multi_select'))
    return null;
  const choice = 'choices' in question ? question.choices.find((c) => c.id === choiceId) : null;
  if (!choice) return null;

  const isMultiSelect = question.type === 'multi_select';
  const selected = isMultiSelect
    ? selectedChoiceIds.includes(choiceId)
    : selectedChoiceId === choiceId;
  const answerIds = isMultiSelect && 'answer' in question ? (question.answer as string[]) : [];
  const showCorrect = isSubmitted && (isMultiSelect ? answerIds.includes(choiceId) : (question as { answer: string }).answer === choiceId);
  const showIncorrect = isSubmitted && selected && !showCorrect;

  return (
    <Component
      data-quiz-choice-indicator
      data-variant={variant}
      aria-hidden
      {...(selected && { 'data-selected': true })}
      {...(showCorrect && { 'data-correct': true })}
      {...(showIncorrect && { 'data-incorrect': true })}
    />
  );
};

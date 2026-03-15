import type { ReactNode } from 'react';
import { useQuestion } from '../hooks/useQuestion.js';

export interface ChoiceProps {
  /** Id of the choice (must match question.choices[].id). */
  choiceId: string;
  children?: ReactNode;
}

/** Renders one multiple_choice or multi_select option. Use inside Choices; toggles/selects on click. */
export const Choice = ({ choiceId, children }: ChoiceProps) => {
  const { question, selectedChoiceId, selectedChoiceIds, selectChoice, toggleChoice, isSubmitted } = useQuestion();
  if (!question || (question.type !== 'multiple_choice' && question.type !== 'multi_select'))
    return null;

  const choice =
    'choices' in question ? question.choices.find((c) => c.id === choiceId) : null;
  if (!choice) return null;

  const isMultiSelect = question.type === 'multi_select';
  const selected = isMultiSelect
    ? selectedChoiceIds.includes(choiceId)
    : selectedChoiceId === choiceId;
  const disabled = isSubmitted;
  const answerIds = isMultiSelect && 'answer' in question ? (question.answer as string[]) : [];
  const showCorrect = isSubmitted && (isMultiSelect ? answerIds.includes(choiceId) : (question as { answer: string }).answer === choiceId);
  const showIncorrect = isSubmitted && selected && !showCorrect;
  const handleClick = () => {
    if (disabled) return;
    if (isMultiSelect) toggleChoice(choiceId);
    else selectChoice(choiceId);
  };

  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      data-choice
      data-choice-id={choiceId}
      {...(selected && { 'data-selected': true })}
      {...(isSubmitted && { 'data-submitted': true })}
      {...(showCorrect && { 'data-correct': true })}
      {...(showIncorrect && { 'data-incorrect': true })}
      {...(disabled && { 'data-disabled': true })}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {children ?? choice.text}
    </button>
  );
};

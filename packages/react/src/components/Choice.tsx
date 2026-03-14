import type { ReactNode } from 'react';
import { useQuestion } from '../hooks/useQuestion.js';

export interface ChoiceProps {
  choiceId: string;
  children?: ReactNode;
}

export const Choice = ({ choiceId, children }: ChoiceProps) => {
  const { question, selectedChoiceId, selectChoice, isSubmitted } = useQuestion();
  if (!question || (question.type !== 'multiple_choice' && question.type !== 'multi_select'))
    return null;

  const choice =
    'choices' in question ? question.choices.find((c) => c.id === choiceId) : null;
  if (!choice) return null;

  const selected = selectedChoiceId === choiceId;
  const disabled = isSubmitted;
  const showCorrect = isSubmitted && 'answer' in question && question.answer === choiceId;
  const showIncorrect = isSubmitted && selected && !showCorrect;

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
      onClick={() => !disabled && selectChoice(choiceId)}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!disabled) selectChoice(choiceId);
        }
      }}
    >
      {children ?? choice.text}
    </button>
  );
};

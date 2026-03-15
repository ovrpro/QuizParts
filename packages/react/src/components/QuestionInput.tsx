import { useQuestion } from '../hooks/useQuestion.js';
import { Instruction } from './Instruction.js';
import { Choices } from './Choices.js';
import { Choice } from './Choice.js';
import { TextInput } from './TextInput.js';
import { MatchPairs } from './MatchPairs.js';
import { OrderList } from './OrderList.js';
import { SentenceBuilder } from './SentenceBuilder.js';

export interface QuestionInputProps {
  /** When true, Choice renders with ChoiceIndicator (default true). */
  showChoiceIndicator?: boolean;
  /** Custom instruction; when omitted, Instruction uses default for question type. */
  instruction?: string;
}

/** Renders the appropriate input for the current question type (choices, text, match pairs, order, sentence builder) with optional Instruction. */
export const QuestionInput = ({
  showChoiceIndicator = true,
  instruction,
}: QuestionInputProps) => {
  const { question } = useQuestion();
  if (!question) return null;

  if (question.type === 'multiple_choice' || question.type === 'multi_select') {
    if (!('choices' in question)) return null;
    return (
      <>
        <Instruction instruction={instruction} />
        <Choices>
          {question.choices.map((c) => (
            <Choice key={c.id} choiceId={c.id} showIndicator={showChoiceIndicator} />
          ))}
        </Choices>
      </>
    );
  }

  if (question.type === 'text_input') {
    return (
      <>
        <Instruction instruction={instruction} />
        <TextInput />
      </>
    );
  }

  if (question.type === 'match_pairs') {
    return (
      <>
        <Instruction instruction={instruction} />
        <MatchPairs />
      </>
    );
  }

  if (question.type === 'order_items') {
    return (
      <>
        <Instruction instruction={instruction} />
        <OrderList />
      </>
    );
  }

  if (question.type === 'sentence_builder') {
    return (
      <>
        <Instruction instruction={instruction} />
        <SentenceBuilder />
      </>
    );
  }

  return null;
};

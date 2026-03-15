import type { ReactNode } from 'react';
import { useQuestion } from '../hooks/useQuestion.js';
import { DEFAULT_INSTRUCTIONS } from '../constants/defaultInstructions.js';

export interface InstructionProps {
  /** Instructional copy. When omitted, uses default for current question type (e.g. "Choose one.", "Select all that apply."). */
  instruction?: string;
  children?: ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

/** Short instruction separate from the main prompt. Uses default by question type when instruction is not provided. */
export const Instruction = ({
  instruction: instructionProp,
  children,
  as: Component = 'p',
}: InstructionProps) => {
  const { question } = useQuestion();
  const instruction =
    instructionProp != null && instructionProp !== ''
      ? instructionProp
      : question && question.type in DEFAULT_INSTRUCTIONS
        ? DEFAULT_INSTRUCTIONS[question.type as keyof typeof DEFAULT_INSTRUCTIONS]
        : null;
  const hasChildren = children != null;
  if (!instruction && !hasChildren) return null;
  return (
    <Component data-quiz-instruction>
      {instruction ?? children}
    </Component>
  );
};

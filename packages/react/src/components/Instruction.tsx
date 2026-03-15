import type { ReactNode } from 'react';

export interface InstructionProps {
  /** Instructional copy (e.g. "Select all that apply", "Match the pairs"). */
  instruction?: string;
  children?: ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

/** Short instruction separate from the main prompt. Renders nothing if no instruction or children. */
export const Instruction = ({
  instruction,
  children,
  as: Component = 'p',
}: InstructionProps) => {
  const hasInstruction = instruction != null && instruction !== '';
  const hasChildren = children != null;
  if (!hasInstruction && !hasChildren) return null;
  return (
    <Component data-quiz-instruction>
      {hasInstruction ? instruction : children}
    </Component>
  );
};

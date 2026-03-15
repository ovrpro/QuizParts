import type { ReactNode } from 'react';

export interface HintProps {
  /** Hint text. When absent, children can be used. */
  hint?: string;
  children?: ReactNode;
  /** When false, render nothing (for future "show hint" toggles). */
  visible?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

/** Renders a hint. Use for study practice or scaffolded exercises. */
export const Hint = ({
  hint,
  children,
  visible = true,
  as: Component = 'div',
}: HintProps) => {
  if (!visible) return null;
  const hasHint = hint != null && hint !== '';
  const hasChildren = children != null;
  if (!hasHint && !hasChildren) return null;
  return (
    <Component data-quiz-hint>
      {hasHint ? hint : children}
    </Component>
  );
};

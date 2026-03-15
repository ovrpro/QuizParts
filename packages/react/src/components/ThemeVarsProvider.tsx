import type { ReactNode } from 'react';
import type { ThemeTokens } from '@quizparts/theme';
import { tokensToCssVars } from '@quizparts/theme';

export interface ThemeVarsProviderProps {
  /** Theme to apply as CSS custom properties (e.g. defaultTheme from @quizparts/theme). */
  theme: ThemeTokens;
  children: ReactNode;
  /** Wrapper element (default 'div'). */
  as?: keyof JSX.IntrinsicElements;
  /** Additional inline styles merged with theme vars. */
  style?: React.CSSProperties;
  className?: string;
}

/** Applies theme tokens as CSS custom properties on a wrapper. Use around QuizRoot so play.css can use --qp-* vars. */
export const ThemeVarsProvider = ({
  theme,
  children,
  as: Component = 'div',
  style,
  className,
}: ThemeVarsProviderProps) => {
  const vars = tokensToCssVars(theme);
  return (
    <Component
      className={className}
      style={{ ...vars, ...style } as React.CSSProperties}
    >
      {children}
    </Component>
  );
};

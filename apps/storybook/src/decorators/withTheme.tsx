import type { Decorator } from '@storybook/react';
import { defaultTheme, calmTheme, darkTheme, tokensToCssVars } from '@quizparts/theme';

const themes = { default: defaultTheme, calm: calmTheme, dark: darkTheme } as const;
type ThemeId = keyof typeof themes;

export const withTheme: Decorator = (Story, context) => {
  const themeId = (context.globals?.theme as ThemeId) ?? (context.parameters?.theme as ThemeId) ?? 'default';
  const theme = themes[themeId] ?? defaultTheme;
  const vars = tokensToCssVars(theme);
  return (
    <div style={{ ...vars, padding: '1rem' } as React.CSSProperties}>
      <Story />
    </div>
  );
};

import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import type { RNTheme } from './defaultTheme.js';
import { defaultTheme } from './defaultTheme.js';

const ThemeContext = createContext<RNTheme>(defaultTheme);

export interface ThemeProviderProps {
  theme?: Partial<RNTheme>;
  children: ReactNode;
}

const mergeTheme = (base: RNTheme, overrides: Partial<RNTheme>): RNTheme => ({
  ...base,
  ...overrides,
  colors: { ...base.colors, ...overrides.colors },
  spacing: { ...base.spacing, ...overrides.spacing },
  fontSize: { ...base.fontSize, ...overrides.fontSize },
  fontWeight: { ...base.fontWeight, ...overrides.fontWeight },
  radius: { ...base.radius, ...overrides.radius },
});

export const ThemeProvider = ({ theme, children }: ThemeProviderProps) => {
  const value = theme ? mergeTheme(defaultTheme, theme) : defaultTheme;
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): RNTheme => useContext(ThemeContext);

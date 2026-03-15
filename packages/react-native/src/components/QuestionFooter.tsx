import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext.js';

export interface QuestionFooterProps {
  children: ReactNode;
}

export const QuestionFooter = ({ children }: QuestionFooterProps) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    footer: { marginTop: theme.spacing.lg },
  });
  return <View style={styles.footer}>{children}</View>;
};

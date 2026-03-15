import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext.js';

export interface QuestionBodyProps {
  children: ReactNode;
}

export const QuestionBody = ({ children }: QuestionBodyProps) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    body: { marginBottom: theme.spacing.md },
  });
  return <View style={styles.body}>{children}</View>;
};

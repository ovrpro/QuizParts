import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext.js';

export interface QuestionHeaderProps {
  children: ReactNode;
}

export const QuestionHeader = ({ children }: QuestionHeaderProps) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    header: { marginBottom: theme.spacing.md },
  });
  return <View style={styles.header}>{children}</View>;
};

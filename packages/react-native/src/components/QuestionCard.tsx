import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext.js';

export interface QuestionCardProps {
  children: ReactNode;
}

export const QuestionCard = ({ children }: QuestionCardProps) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    card: {
      padding: theme.spacing.xl,
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.surface,
    },
  });
  return <View style={styles.card}>{children}</View>;
};

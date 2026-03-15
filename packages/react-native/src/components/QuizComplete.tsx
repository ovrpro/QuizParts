import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useQuiz } from '../hooks/useQuiz.js';
import { useTheme } from '../theme/ThemeContext.js';

export interface QuizCompleteProps {
  title?: ReactNode;
  message?: ReactNode;
  resetLabel?: string;
  onReset?: () => void;
  children?: ReactNode;
}

export const QuizComplete = ({
  title = 'Quiz complete!',
  message,
  resetLabel = 'Start again',
  onReset,
  children,
}: QuizCompleteProps) => {
  const { isComplete, resetQuiz } = useQuiz();
  const theme = useTheme();
  if (!isComplete) return null;

  const handleReset = onReset ?? resetQuiz;

  if (children != null) {
    return <View testID="quiz-complete">{children}</View>;
  }

  const styles = StyleSheet.create({
    container: {
      padding: theme.spacing.xl,
      alignItems: 'center',
    },
    title: {
      fontSize: theme.fontSize.lg,
      fontWeight: theme.fontWeight.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    message: {
      fontSize: theme.fontSize.base,
      color: theme.colors.textMuted,
      marginBottom: theme.spacing.lg,
    },
    resetButton: {
      minHeight: theme.minTapTarget,
      paddingHorizontal: theme.spacing.xl,
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: theme.spacing.md,
    },
    resetText: {
      fontSize: theme.fontSize.base,
      fontWeight: theme.fontWeight.bold,
      color: theme.colors.primaryContrast,
    },
  });

  return (
    <View style={styles.container} testID="quiz-complete">
      {title != null && (typeof title === 'string' ? <Text style={styles.title}>{title}</Text> : title)}
      {message != null && (typeof message === 'string' ? <Text style={styles.message}>{message}</Text> : message)}
      <Pressable style={styles.resetButton} onPress={() => handleReset()} testID="quiz-reset">
        <Text style={styles.resetText}>{resetLabel}</Text>
      </Pressable>
    </View>
  );
};

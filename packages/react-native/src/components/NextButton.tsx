import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useQuiz } from '../hooks/useQuiz.js';
import { useTheme } from '../theme/ThemeContext.js';

export interface NextButtonProps {
  children?: ReactNode;
}

export const NextButton = ({ children = 'Next' }: NextButtonProps) => {
  const { canGoNext, goToNextQuestion } = useQuiz();
  const theme = useTheme();
  const styles = StyleSheet.create({
    button: {
      minHeight: theme.minTapTarget,
      paddingHorizontal: theme.spacing.xl,
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: canGoNext ? 1 : 0.6,
    },
    text: {
      fontSize: theme.fontSize.base,
      fontWeight: theme.fontWeight.bold,
      color: theme.colors.primaryContrast,
    },
  });
  return (
    <Pressable
      style={styles.button}
      onPress={() => canGoNext && goToNextQuestion()}
      disabled={!canGoNext}
      testID="quiz-next"
      accessibilityState={{ disabled: !canGoNext }}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

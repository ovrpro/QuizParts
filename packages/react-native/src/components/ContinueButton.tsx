import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useQuiz } from '../hooks/useQuiz.js';
import { useTheme } from '../theme/ThemeContext.js';

export interface ContinueButtonProps {
  children?: ReactNode;
}

export const ContinueButton = ({ children = 'Skip' }: ContinueButtonProps) => {
  const { canGoNext, goToNextQuestion } = useQuiz();
  const theme = useTheme();
  const styles = StyleSheet.create({
    button: {
      minHeight: theme.minTapTarget,
      paddingHorizontal: theme.spacing.xl,
      borderRadius: theme.radius.full,
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: theme.colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: canGoNext ? 1 : 0.6,
    },
    text: {
      fontSize: theme.fontSize.base,
      fontWeight: theme.fontWeight.bold,
      color: theme.colors.text,
    },
  });
  return (
    <Pressable
      style={styles.button}
      onPress={() => canGoNext && goToNextQuestion()}
      disabled={!canGoNext}
      testID="quiz-continue"
      accessibilityState={{ disabled: !canGoNext }}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

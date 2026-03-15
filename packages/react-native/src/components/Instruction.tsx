import type { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useQuestion } from '../hooks/useQuestion.js';
import { useTheme } from '../theme/ThemeContext.js';
import { DEFAULT_INSTRUCTIONS } from '../constants/defaultInstructions.js';

export interface InstructionProps {
  instruction?: string;
  children?: ReactNode;
}

export const Instruction = ({ instruction: instructionProp, children }: InstructionProps) => {
  const { question } = useQuestion();
  const theme = useTheme();
  const instruction =
    instructionProp != null && instructionProp !== ''
      ? instructionProp
      : question && question.type in DEFAULT_INSTRUCTIONS
        ? DEFAULT_INSTRUCTIONS[question.type as keyof typeof DEFAULT_INSTRUCTIONS]
        : null;
  const hasChildren = children != null;
  if (!instruction && !hasChildren) return null;
  const styles = StyleSheet.create({
    instruction: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textMuted,
      marginBottom: theme.spacing.sm,
    },
  });
  return (
    <Text style={styles.instruction} testID="quiz-instruction">
      {instruction ?? children}
    </Text>
  );
};

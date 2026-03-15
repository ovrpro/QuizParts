import type { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useProgress } from '../hooks/useProgress.js';
import { useTheme } from '../theme/ThemeContext.js';

export interface QuestionCounterProps {
  format?: string;
  children?: ReactNode;
}

const DEFAULT_FORMAT = 'Question {current} of {total}';

export const QuestionCounter = ({
  format = DEFAULT_FORMAT,
  children,
}: QuestionCounterProps) => {
  const { current, total } = useProgress();
  const theme = useTheme();
  const text = format.replace('{current}', String(current)).replace('{total}', String(total));
  const styles = StyleSheet.create({
    counter: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textMuted,
    },
  });
  return (
    <Text style={styles.counter} testID="quiz-question-counter" accessibilityLiveRegion="polite">
      {children ?? text}
    </Text>
  );
};

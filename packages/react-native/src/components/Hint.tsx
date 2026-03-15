import type { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext.js';

export interface HintProps {
  hint?: string;
  children?: ReactNode;
  visible?: boolean;
}

export const Hint = ({ hint, children, visible = true }: HintProps) => {
  const theme = useTheme();
  if (!visible) return null;
  const hasHint = hint != null && hint !== '';
  const hasChildren = children != null;
  if (!hasHint && !hasChildren) return null;
  const styles = StyleSheet.create({
    hint: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textMuted,
      marginTop: theme.spacing.sm,
    },
  });
  return (
    <Text style={styles.hint} testID="quiz-hint">
      {hasHint ? hint : children}
    </Text>
  );
};

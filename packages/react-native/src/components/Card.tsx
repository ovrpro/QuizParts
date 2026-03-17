import type { ReactNode } from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeContext.js';

export interface CardProps {
  /** Optional heading for the card. */
  title?: string;
  /** Card body content. */
  children: ReactNode;
  /** Optional style for the root View. */
  style?: ViewStyle;
}

/** General-purpose presentational card. */
export const Card = ({ title, children, style }: CardProps) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    card: {
      padding: theme.spacing.xl,
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    title: {
      fontSize: theme.fontSize.lg,
      fontWeight: theme.fontWeight.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    body: {
      color: theme.colors.text,
      fontSize: theme.fontSize.base,
      lineHeight: theme.fontSize.base * 1.5,
    },
  });

  const bodyContent =
    typeof children === 'string' ? (
      <Text style={styles.body}>{children}</Text>
    ) : (
      children
    );

  return (
    <View style={[styles.card, style]} testID="quiz-card">
      {title != null && title !== '' ? (
        <>
          <Text style={styles.title} testID="quiz-card-title">
            {title}
          </Text>
          <View testID="quiz-card-body">{bodyContent}</View>
        </>
      ) : (
        <View testID="quiz-card-body">{bodyContent}</View>
      )}
    </View>
  );
};

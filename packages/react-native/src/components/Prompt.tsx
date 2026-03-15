import { Text } from 'react-native';
import { useQuestion } from '../hooks/useQuestion.js';
import { useTheme } from '../theme/ThemeContext.js';
import { StyleSheet } from 'react-native';

export const Prompt = () => {
  const { question } = useQuestion();
  const theme = useTheme();
  if (!question) return null;
  const styles = StyleSheet.create({
    prompt: {
      fontSize: theme.fontSize.lg,
      fontWeight: theme.fontWeight.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
  });
  return <Text style={styles.prompt} testID="quiz-prompt">{question.prompt}</Text>;
};

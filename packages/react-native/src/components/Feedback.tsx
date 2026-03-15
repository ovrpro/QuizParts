import { StyleSheet, Text, View } from 'react-native';
import { useQuestion } from '../hooks/useQuestion.js';
import { useTheme } from '../theme/ThemeContext.js';

export const Feedback = () => {
  const { feedback, isSubmitted } = useQuestion();
  const theme = useTheme();
  if (!isSubmitted || !feedback) return null;
  const isCorrect = feedback.isCorrect;
  const styles = StyleSheet.create({
    container: {
      marginTop: theme.spacing.md,
      padding: theme.spacing.lg,
      borderRadius: theme.radius.lg,
      backgroundColor: isCorrect ? theme.colors.successSoft : theme.colors.dangerSoft,
      borderWidth: 2,
      borderColor: isCorrect ? theme.colors.success : theme.colors.danger,
    },
    main: {
      fontSize: theme.fontSize.base,
      fontWeight: theme.fontWeight.bold,
      color: theme.colors.text,
    },
    explanation: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.text,
      marginTop: theme.spacing.sm,
    },
  });
  return (
    <View style={styles.container} testID="quiz-feedback" accessibilityRole="summary">
      <Text style={styles.main}>{isCorrect ? 'Correct!' : 'Incorrect.'}</Text>
      {isCorrect && feedback.explanation != null && feedback.explanation !== '' && (
        <Text style={styles.explanation}>{feedback.explanation}</Text>
      )}
    </View>
  );
};

import { StyleSheet, Text, View } from 'react-native';
import { useProgress } from '../hooks/useProgress.js';
import { useTheme } from '../theme/ThemeContext.js';

export const Progress = () => {
  const { current, total, percent, score } = useProgress();
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: { flexDirection: 'row', gap: theme.spacing.md, marginBottom: theme.spacing.sm },
    text: { fontSize: theme.fontSize.sm, color: theme.colors.textMuted },
  });
  return (
    <View
      style={styles.container}
      testID="quiz-progress"
      accessibilityLabel={`Question ${current} of ${total}`}
      accessibilityValue={{ min: 1, max: total, now: current }}
    >
      <Text style={styles.text}>{current} / {total}</Text>
      <Text style={styles.text}>{percent}%</Text>
      <Text style={styles.text}>Score: {score}</Text>
    </View>
  );
};

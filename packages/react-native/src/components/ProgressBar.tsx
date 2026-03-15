import { View } from 'react-native';
import { useProgress } from '../hooks/useProgress.js';
import { useTheme } from '../theme/ThemeContext.js';
import { StyleSheet } from 'react-native';

export const ProgressBar = () => {
  const { percent } = useProgress();
  const theme = useTheme();
  const styles = StyleSheet.create({
    track: {
      height: theme.progressBarHeight,
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.border,
      overflow: 'hidden',
    },
    fill: {
      height: theme.progressBarHeight,
      width: `${percent}%`,
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.primary,
    },
  });
  return (
    <View
      style={styles.track}
      testID="quiz-progress-bar"
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: percent }}
    >
      <View style={styles.fill} />
    </View>
  );
};

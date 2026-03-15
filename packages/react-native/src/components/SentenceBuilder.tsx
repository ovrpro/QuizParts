import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useQuestion } from '../hooks/useQuestion.js';
import { useTheme } from '../theme/ThemeContext.js';

export const SentenceBuilder = () => {
  const { question, sentenceOrder, setSentenceOrder, isSubmitted } = useQuestion();
  const theme = useTheme();

  if (!question || question.type !== 'sentence_builder') return null;
  const { tiles } = question;
  const disabled = isSubmitted;

  const available = tiles.slice();
  for (const s of sentenceOrder) {
    const i = available.indexOf(s);
    if (i >= 0) available.splice(i, 1);
  }

  const handleAddTile = (value: string) => {
    if (disabled) return;
    setSentenceOrder([...sentenceOrder, value]);
  };

  const handleRemoveAt = (index: number) => {
    if (disabled) return;
    setSentenceOrder(sentenceOrder.filter((_, i) => i !== index));
  };

  const styles = StyleSheet.create({
    container: { gap: theme.spacing.lg },
    sectionLabel: { fontSize: theme.fontSize.sm, fontWeight: '600', color: theme.colors.text, marginBottom: theme.spacing.xs },
    slot: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.xs,
      minHeight: 40,
      padding: theme.spacing.sm,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.radius.sm,
      marginTop: theme.spacing.xs,
    },
    placeholder: { fontSize: theme.fontSize.sm, color: theme.colors.textMuted },
    tile: {
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.sm,
      margin: 2,
      borderRadius: theme.radius.sm,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      opacity: disabled ? 0.7 : 1,
    },
    tileText: { fontSize: theme.fontSize.sm, color: theme.colors.text },
    bank: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.xs, marginTop: theme.spacing.xs },
    bankTile: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: theme.radius.md,
      borderWidth: 2,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      opacity: disabled ? 0.7 : 1,
    },
    bankTileText: { fontSize: theme.fontSize.base, color: theme.colors.text },
  });

  return (
    <View style={styles.container} testID="quiz-sentence-builder" accessibilityLabel="Sentence builder">
      <View>
        <Text style={styles.sectionLabel}>Sentence:</Text>
        <View style={styles.slot}>
          {sentenceOrder.length === 0 && (
            <Text style={styles.placeholder}>Tap tiles below to build the sentence</Text>
          )}
          {sentenceOrder.map((value, index) => (
            <Pressable
              key={`${value}-${index}`}
              style={styles.tile}
              onPress={() => handleRemoveAt(index)}
              disabled={disabled}
              testID={`sentence-tile-${index}`}
            >
              <Text style={styles.tileText}>{value} {!disabled && '✕'}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View>
        <Text style={styles.sectionLabel}>Tiles:</Text>
        <View style={styles.bank}>
          {available.map((value, i) => (
            <Pressable
              key={`${value}-${i}`}
              style={styles.bankTile}
              onPress={() => handleAddTile(value)}
              disabled={disabled}
              testID={`tile-${value}-${i}`}
            >
              <Text style={styles.bankTileText}>{value}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

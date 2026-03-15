import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useQuestion } from '../hooks/useQuestion.js';
import { useTheme } from '../theme/ThemeContext.js';

const MIN_ITEM_WIDTH = 96;
const MIN_COLUMN_WIDTH = 120;

export const MatchPairs = () => {
  const { question, matchPairs, setMatchPairs, isSubmitted } = useQuestion();
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const theme = useTheme();

  if (!question || question.type !== 'match_pairs') return null;
  const { pairs } = question;
  const lefts = pairs.map((p) => p.left);
  const rights = pairs.map((p) => p.right);
  const usedLeft = new Set(matchPairs.map(([l]) => l));
  const usedRight = new Set(matchPairs.map(([, r]) => r));
  const availableLeft = lefts.filter((l) => !usedLeft.has(l));
  const availableRight = rights.filter((r) => !usedRight.has(r));
  const disabled = isSubmitted;

  const handleLeftClick = (left: string) => {
    if (disabled) return;
    setSelectedLeft((prev) => (prev === left ? null : left));
  };

  const handleRightClick = (right: string) => {
    if (disabled || !selectedLeft) return;
    setMatchPairs([...matchPairs, [selectedLeft, right]]);
    setSelectedLeft(null);
  };

  const handleRemovePair = (index: number) => {
    if (disabled) return;
    setMatchPairs(matchPairs.filter((_, i) => i !== index));
  };

  const styles = StyleSheet.create({
    container: { gap: theme.spacing.lg },
    matchedSection: { marginBottom: theme.spacing.sm },
    matchedLabel: { fontSize: theme.fontSize.sm, fontWeight: '600', color: theme.colors.text, marginBottom: theme.spacing.xs },
    matchedList: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm },
    pairChip: {
      minHeight: theme.minTapTarget,
      minWidth: MIN_ITEM_WIDTH,
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.sm,
      borderRadius: theme.radius.md,
      borderWidth: 2,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      justifyContent: 'center',
      opacity: disabled ? 0.7 : 1,
    },
    pairChipText: { fontSize: theme.fontSize.sm, color: theme.colors.text },
    columns: { flexDirection: 'row', gap: theme.spacing.lg, flexWrap: 'wrap' },
    column: { minWidth: MIN_COLUMN_WIDTH },
    columnLabel: { fontSize: theme.fontSize.sm, fontWeight: '600', color: theme.colors.text, marginBottom: theme.spacing.xs },
    columnList: { gap: theme.spacing.xs },
    itemButton: {
      minHeight: theme.minTapTarget,
      minWidth: MIN_ITEM_WIDTH,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.radius.md,
      borderWidth: 2,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: disabled ? 0.7 : 1,
    },
    itemButtonSelected: { borderColor: theme.colors.primary, backgroundColor: theme.colors.surface },
    itemText: { fontSize: theme.fontSize.base, color: theme.colors.text },
    itemTextSelected: { fontWeight: '600' },
  });

  return (
    <View style={styles.container} testID="quiz-match-pairs" accessibilityLabel="Match pairs">
      {matchPairs.length > 0 && (
        <View style={styles.matchedSection}>
          <Text style={styles.matchedLabel}>Matched:</Text>
          <View style={styles.matchedList}>
            {matchPairs.map(([l, r], i) => (
              <Pressable
                key={`${l}-${r}-${i}`}
                style={styles.pairChip}
                onPress={() => handleRemovePair(i)}
                disabled={disabled}
                testID={`match-pair-${i}`}
              >
                <Text style={styles.pairChipText}>{l} → {r} {!disabled && '✕'}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}
      <View style={styles.columns}>
        <View style={styles.column}>
          <Text style={styles.columnLabel}>Left</Text>
          <View style={styles.columnList}>
            {availableLeft.map((left) => (
              <Pressable
                key={left}
                style={[styles.itemButton, selectedLeft === left && styles.itemButtonSelected]}
                onPress={() => handleLeftClick(left)}
                disabled={disabled}
                testID={`match-left-${left}`}
                accessibilityState={{ selected: selectedLeft === left }}
              >
                <Text style={[styles.itemText, selectedLeft === left && styles.itemTextSelected]}>{left}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.column}>
          <Text style={styles.columnLabel}>Right</Text>
          <View style={styles.columnList}>
            {availableRight.map((right) => (
              <Pressable
                key={right}
                style={styles.itemButton}
                onPress={() => handleRightClick(right)}
                disabled={disabled}
                testID={`match-right-${right}`}
              >
                <Text style={styles.itemText}>{right}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

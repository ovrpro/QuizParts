import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useQuestion } from '../hooks/useQuestion.js';
import { useTheme } from '../theme/ThemeContext.js';

const move = (ids: string[], index: number, direction: 'up' | 'down'): string[] => {
  const next = [...ids];
  const target = direction === 'up' ? index - 1 : index + 1;
  if (target < 0 || target >= next.length) return next;
  [next[index], next[target]] = [next[target]!, next[index]!];
  return next;
};

export const OrderList = () => {
  const { question, orderedIds, setOrderedIds, isSubmitted } = useQuestion();
  const theme = useTheme();

  if (!question || question.type !== 'order_items') return null;
  const { items } = question;
  const itemMap = new Map(items.map((i) => [i.id, i]));
  const ids = orderedIds.length > 0 ? orderedIds : items.map((i) => i.id);
  const disabled = isSubmitted;

  useEffect(() => {
    if (orderedIds.length === 0 && items.length > 0) {
      setOrderedIds(items.map((i) => i.id));
    }
  }, [items, orderedIds.length, setOrderedIds]);

  const handleMoveUp = (index: number) => {
    if (disabled || index <= 0) return;
    setOrderedIds(move(ids, index, 'up'));
  };

  const handleMoveDown = (index: number) => {
    if (disabled || index >= ids.length - 1) return;
    setOrderedIds(move(ids, index, 'down'));
  };

  const styles = StyleSheet.create({
    container: { gap: theme.spacing.sm },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    itemText: { flex: 1, fontSize: theme.fontSize.base, color: theme.colors.text },
    moveButton: {
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.sm,
      minHeight: theme.minTapTarget,
      justifyContent: 'center',
      opacity: disabled ? 0.6 : 1,
    },
    moveText: { fontSize: theme.fontSize.base, color: theme.colors.primary },
  });

  return (
    <View style={styles.container} testID="quiz-order-list" accessibilityLabel="Order items">
      {ids.map((id, index) => {
        const item = itemMap.get(id);
        if (!item) return null;
        return (
          <View key={id} style={styles.row} testID={`order-item-${id}`}>
            <Text style={styles.itemText}>{item.text}</Text>
            <Pressable
              style={styles.moveButton}
              onPress={() => handleMoveUp(index)}
              disabled={disabled || index === 0}
              accessibilityLabel={`Move ${item.text} up`}
            >
              <Text style={styles.moveText}>↑</Text>
            </Pressable>
            <Pressable
              style={styles.moveButton}
              onPress={() => handleMoveDown(index)}
              disabled={disabled || index === ids.length - 1}
              accessibilityLabel={`Move ${item.text} down`}
            >
              <Text style={styles.moveText}>↓</Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

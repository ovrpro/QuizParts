import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useQuestion } from '../hooks/useQuestion.js';
import { useTheme } from '../theme/ThemeContext.js';
import { ChoiceIndicator } from './ChoiceIndicator.js';

export interface ChoiceProps {
  choiceId: string;
  showIndicator?: boolean;
  children?: ReactNode;
}

export const Choice = ({ choiceId, showIndicator = false, children }: ChoiceProps) => {
  const { question, selectedChoiceId, selectedChoiceIds, selectChoice, toggleChoice, isSubmitted } = useQuestion();
  const theme = useTheme();
  if (!question || (question.type !== 'multiple_choice' && question.type !== 'multi_select'))
    return null;

  const choice = 'choices' in question ? question.choices.find((c) => c.id === choiceId) : null;
  if (!choice) return null;

  const isMultiSelect = question.type === 'multi_select';
  const selected = isMultiSelect ? selectedChoiceIds.includes(choiceId) : selectedChoiceId === choiceId;
  const disabled = isSubmitted;
  const answerIds = isMultiSelect && 'answer' in question ? (question.answer as string[]) : [];
  const showCorrect = isSubmitted && (isMultiSelect ? answerIds.includes(choiceId) : (question as { answer: string }).answer === choiceId);
  const showIncorrect = isSubmitted && selected && !showCorrect;

  const handlePress = () => {
    if (disabled) return;
    if (isMultiSelect) toggleChoice(choiceId);
    else selectChoice(choiceId);
  };

  const borderColor = showCorrect
    ? theme.colors.success
    : showIncorrect
      ? theme.colors.danger
      : selected
        ? theme.colors.primary
        : theme.colors.border;
  const backgroundColor = showCorrect
    ? theme.colors.successSoft
    : showIncorrect
      ? theme.colors.dangerSoft
      : selected
        ? theme.colors.surface
        : theme.colors.surface;

  const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: theme.minTapTarget,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.radius.lg,
      borderWidth: 2,
      borderColor,
      backgroundColor,
      opacity: disabled ? 0.7 : 1,
      marginBottom: theme.spacing.sm,
    },
    text: {
      fontSize: theme.fontSize.base,
      fontWeight: selected ? theme.fontWeight.bold : theme.fontWeight.normal,
      color: theme.colors.text,
      flex: 1,
    },
  });

  const label = children ?? choice.text;
  const content = showIndicator ? (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <ChoiceIndicator choiceId={choiceId} variant={isMultiSelect ? 'checkbox' : 'radio'} />
      <Text style={styles.text}>{label}</Text>
    </View>
  ) : (
    <Text style={styles.text}>{label}</Text>
  );

  return (
    <Pressable
      style={styles.button}
      onPress={handlePress}
      disabled={disabled}
      testID={`choice-${choiceId}`}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
    >
      {content}
    </Pressable>
  );
};

import { StyleSheet, View } from 'react-native';
import { useQuestion } from '../hooks/useQuestion.js';
import { useTheme } from '../theme/ThemeContext.js';

export interface ChoiceIndicatorProps {
  choiceId: string;
  variant?: 'radio' | 'checkbox';
}

export const ChoiceIndicator = ({ choiceId, variant = 'radio' }: ChoiceIndicatorProps) => {
  const { question, selectedChoiceId, selectedChoiceIds, isSubmitted } = useQuestion();
  const theme = useTheme();
  if (!question || (question.type !== 'multiple_choice' && question.type !== 'multi_select'))
    return null;
  const choice = 'choices' in question ? question.choices.find((c) => c.id === choiceId) : null;
  if (!choice) return null;

  const isMultiSelect = question.type === 'multi_select';
  const selected = isMultiSelect
    ? selectedChoiceIds.includes(choiceId)
    : selectedChoiceId === choiceId;
  const answerIds = isMultiSelect && 'answer' in question ? (question.answer as string[]) : [];
  const showCorrect = isSubmitted && (isMultiSelect ? answerIds.includes(choiceId) : (question as { answer: string }).answer === choiceId);
  const showIncorrect = isSubmitted && selected && !showCorrect;

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
        ? theme.colors.primary
        : 'transparent';

  const size = 20;
  const styles = StyleSheet.create({
    indicator: {
      width: size,
      height: size,
      borderRadius: variant === 'radio' ? size / 2 : theme.radius.sm,
      borderWidth: 2,
      borderColor,
      backgroundColor,
      marginRight: theme.spacing.sm,
    },
  });

  return <View style={styles.indicator} testID={`choice-indicator-${choiceId}`} accessibilityElementsHidden />;
};

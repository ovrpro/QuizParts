import { StyleSheet, TextInput as RNTextInput } from 'react-native';
import { useQuestion } from '../hooks/useQuestion.js';
import { useTheme } from '../theme/ThemeContext.js';

export interface TextInputProps {
  placeholder?: string;
  disabled?: boolean;
}

export const TextInput = ({ placeholder, disabled: disabledProp }: TextInputProps) => {
  const { question, textValue, setTextValue, isSubmitted } = useQuestion();
  const theme = useTheme();
  if (!question || question.type !== 'text_input') return null;
  const disabled = disabledProp ?? isSubmitted;

  const styles = StyleSheet.create({
    input: {
      minHeight: theme.minTapTarget,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      fontSize: theme.fontSize.base,
      color: theme.colors.text,
      backgroundColor: theme.colors.surface,
      borderWidth: 2,
      borderColor: theme.colors.border,
      borderRadius: theme.radius.md,
      opacity: disabled ? 0.7 : 1,
    },
  });

  return (
    <RNTextInput
      style={styles.input}
      value={textValue}
      onChangeText={setTextValue}
      placeholder={placeholder}
      placeholderTextColor={theme.colors.textMuted}
      editable={!disabled}
      testID="quiz-text-input"
      accessibilityLabel={question.prompt}
    />
  );
};

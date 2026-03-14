import { useQuestion } from '../hooks/useQuestion.js';

export interface TextInputProps {
  as?: keyof JSX.IntrinsicElements;
  placeholder?: string;
  disabled?: boolean;
}

export const TextInput = ({
  as: Component = 'input',
  placeholder,
  disabled: disabledProp,
}: TextInputProps) => {
  const { question, textValue, setTextValue, isSubmitted } = useQuestion();
  if (!question || question.type !== 'text_input') return null;
  const disabled = disabledProp ?? isSubmitted;

  const common = {
    'data-quiz-text-input': true,
    'data-disabled': disabled ? true : undefined,
    'data-submitted': isSubmitted ? true : undefined,
    value: textValue,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setTextValue(e.target.value),
    disabled,
    placeholder,
    'aria-label': question.prompt,
  };

  if (Component === 'input') {
    return <input type="text" {...common} />;
  }
  return <Component {...(common as Record<string, unknown>)} />;
};

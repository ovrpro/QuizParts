import { useQuestion } from '../hooks/useQuestion.js';

export interface PromptProps {
  as?: keyof JSX.IntrinsicElements;
}

export const Prompt = ({ as: Component = 'p' }: PromptProps) => {
  const { question } = useQuestion();
  if (!question) return null;
  return <Component data-quiz-prompt>{question.prompt}</Component>;
};

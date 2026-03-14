import { useQuizContext } from './useQuizContext.js';

export const useQuestion = () => {
  const { session, submitAnswer, selectChoice, setTextValue } = useQuizContext();
  const idx = session.currentQuestionIndex;
  const question = session.quiz.questions[idx] ?? null;
  const questionState = session.questionStates[idx] ?? null;

  if (!question || !questionState) {
    return {
      question: null,
      questionState: null,
      status: 'idle' as const,
      selectedChoiceId: null,
      selectedChoiceIds: [],
      textValue: '',
      isSubmitted: false,
      isCorrect: false,
      isIncorrect: false,
      feedback: null,
      selectChoice: () => {},
      toggleChoice: () => {},
      setTextValue: () => {},
      submit: () => ({ correct: false }),
    };
  }

  const status = questionState.status;
  const isSubmitted = status === 'correct' || status === 'incorrect';
  const isCorrect = questionState.isCorrect === true;
  const isIncorrect = questionState.isCorrect === false;

  const selectedChoiceId =
    question.type === 'multiple_choice'
      ? questionState.input.selectedChoiceId ?? null
      : null;
  const selectedChoiceIds =
    question.type === 'multi_select'
      ? questionState.input.selectedChoiceIds ?? []
      : [];
  const textValue = question.type === 'text_input' ? (questionState.input.text ?? '') : '';

  const feedback = isSubmitted
    ? {
        isCorrect,
        explanation:
          'explanation' in question ? (question as { explanation?: string }).explanation : undefined,
      }
    : null;

  return {
    question,
    questionState,
    status,
    selectedChoiceId,
    selectedChoiceIds,
    textValue,
    isSubmitted,
    isCorrect,
    isIncorrect,
    feedback,
    selectChoice,
    toggleChoice: selectChoice,
    setTextValue,
    submit: submitAnswer,
  };
};

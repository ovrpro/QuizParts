import { useQuizContext } from './useQuizContext.js';

/**
 * Current question state and input setters. Use inside QuizProvider for question-type-specific UI.
 * @returns question, selectedChoiceId/selectedChoiceIds, textValue, matchPairs, orderedIds, sentenceOrder, feedback, selectChoice, toggleChoice, setTextValue, setMatchPairs, setOrderedIds, setSentenceOrder.
 */
export const useQuestion = () => {
  const { session, submitAnswer, selectChoice, toggleChoice, setTextValue, setMatchPairs: setMatchPairsContext, setOrderedIds: setOrderedIdsContext, setSentenceOrder: setSentenceOrderContext } = useQuizContext();
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
      setMatchPairs: () => {},
      setOrderedIds: () => {},
      setSentenceOrder: () => {},
      matchPairs: [],
      orderedIds: [],
      sentenceOrder: [],
      submit: () => ({ correct: false } as { correct: boolean }),
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
  const matchPairs = question.type === 'match_pairs' ? (questionState.input.matchPairs ?? []) : [];
  const orderedIds = question.type === 'order_items' ? (questionState.input.orderedIds ?? []) : [];
  const sentenceOrder = question.type === 'sentence_builder' ? (questionState.input.sentenceOrder ?? []) : [];

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
    matchPairs,
    orderedIds,
    sentenceOrder,
    isSubmitted,
    isCorrect,
    isIncorrect,
    feedback,
    selectChoice,
    toggleChoice,
    setTextValue,
    setMatchPairs: setMatchPairsContext,
    setOrderedIds: setOrderedIdsContext,
    setSentenceOrder: setSentenceOrderContext,
    submit: submitAnswer,
  };
};

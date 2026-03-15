import type { ReactNode } from 'react';
import { createContext, useCallback, useMemo, useState } from 'react';
import type { Quiz } from '@quizparts/schema';
import type { QuizSession } from '@quizparts/core';
import {
  createQuizSession,
  selectChoice,
  toggleChoice,
  setTextInput,
  setMatchPairs,
  setOrderedIds,
  setSentenceOrder as setSentenceOrderCore,
  submitAnswer,
  goToNextQuestion,
  goToPreviousQuestion,
  resetQuiz,
  getProgress,
} from '@quizparts/core';

export interface QuizContextValue {
  session: QuizSession;
  progress: ReturnType<typeof getProgress>;
  submitAnswer: () => { correct: boolean };
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  resetQuiz: () => void;
  selectChoice: (choiceId: string) => void;
  toggleChoice: (choiceId: string) => void;
  setTextValue: (value: string) => void;
  setMatchPairs: (pairs: Array<[string, string]>) => void;
  setOrderedIds: (orderedIds: string[]) => void;
  setSentenceOrder: (order: string[]) => void;
}

const QuizContext = createContext<QuizContextValue | null>(null);

export interface QuizProviderProps {
  /** Parsed quiz (from parseQuiz). */
  quiz: Quiz;
  /** Zero-based index to start at (default 0). */
  initialQuestionIndex?: number;
  /** Pre-built session (e.g. for Storybook); must match quiz. */
  initialSession?: QuizSession;
  children: ReactNode;
  /** Called after each submit with whether the answer was correct. */
  onQuestionSubmit?: (correct: boolean) => void;
  /** Called when the current question index changes. */
  onQuestionChange?: (index: number) => void;
  /** Called when all questions have been attempted. */
  onComplete?: () => void;
}

export const QuizProvider = ({
  quiz,
  initialQuestionIndex = 0,
  initialSession,
  children,
  onQuestionSubmit,
  onQuestionChange,
  onComplete,
}: QuizProviderProps) => {
  const [session, setSession] = useState<QuizSession>(() => {
    if (initialSession) return initialSession;
    const s = createQuizSession(quiz);
    if (initialQuestionIndex > 0 && initialQuestionIndex < quiz.questions.length) {
      const next = [...s.questionStates];
      for (let i = 0; i < next.length; i++) {
        next[i] = { ...next[i]!, status: i < initialQuestionIndex ? 'complete' : i === initialQuestionIndex ? 'active' : 'idle' };
      }
      return { ...s, currentQuestionIndex: initialQuestionIndex, questionStates: next };
    }
    return s;
  });

  const progress = useMemo(() => getProgress(session), [session]);

  const handleSubmitAnswer = useCallback(() => {
    const result = submitAnswer(session);
    setSession(result.session);
    onQuestionSubmit?.(result.correct);
    return result;
  }, [session, onQuestionSubmit]);

  const handleGoToNext = useCallback(() => {
    const next = goToNextQuestion(session);
    setSession(next);
    onQuestionChange?.(next.currentQuestionIndex);
    if (next.currentQuestionIndex >= session.quiz.questions.length && progress.attemptedCount >= session.quiz.questions.length) {
      onComplete?.();
    }
  }, [session, onQuestionChange, onComplete, progress.attemptedCount]);

  const handleGoToPrevious = useCallback(() => {
    setSession(goToPreviousQuestion(session));
  }, [session]);

  const handleReset = useCallback(() => {
    setSession(resetQuiz(session));
  }, [session]);

  const handleSelectChoice = useCallback(
    (choiceId: string) => {
      setSession(selectChoice(session, session.currentQuestionIndex, choiceId));
    },
    [session]
  );

  const handleToggleChoice = useCallback(
    (choiceId: string) => {
      setSession(toggleChoice(session, session.currentQuestionIndex, choiceId));
    },
    [session]
  );

  const handleSetTextValue = useCallback(
    (value: string) => {
      setSession(setTextInput(session, session.currentQuestionIndex, value));
    },
    [session]
  );

  const handleSetMatchPairs = useCallback(
    (pairs: Array<[string, string]>) => {
      setSession(setMatchPairs(session, session.currentQuestionIndex, pairs));
    },
    [session]
  );

  const handleSetOrderedIds = useCallback(
    (orderedIds: string[]) => {
      setSession(setOrderedIds(session, session.currentQuestionIndex, orderedIds));
    },
    [session]
  );

  const handleSetSentenceOrder = useCallback(
    (order: string[]) => {
      setSession(setSentenceOrderCore(session, session.currentQuestionIndex, order));
    },
    [session]
  );

  const value: QuizContextValue = useMemo(
    () => ({
      session,
      progress,
      submitAnswer: handleSubmitAnswer,
      goToNextQuestion: handleGoToNext,
      goToPreviousQuestion: handleGoToPrevious,
      resetQuiz: handleReset,
      selectChoice: handleSelectChoice,
      toggleChoice: handleToggleChoice,
      setTextValue: handleSetTextValue,
      setMatchPairs: handleSetMatchPairs,
      setOrderedIds: handleSetOrderedIds,
      setSentenceOrder: handleSetSentenceOrder,
    }),
    [
      session,
      progress,
      handleSubmitAnswer,
      handleGoToNext,
      handleGoToPrevious,
      handleReset,
      handleSelectChoice,
      handleToggleChoice,
      handleSetTextValue,
      handleSetMatchPairs,
      handleSetOrderedIds,
      handleSetSentenceOrder,
    ]
  );

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};

export const getQuizContext = () => QuizContext;
export default QuizContext;

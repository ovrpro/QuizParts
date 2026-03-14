import type { ReactNode } from 'react';
import { createContext, useCallback, useMemo, useState } from 'react';
import type { Quiz } from '@quizparts/schema';
import type { QuizSession } from '@quizparts/core';
import {
  createQuizSession,
  selectChoice,
  setTextInput,
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
  setTextValue: (value: string) => void;
}

const QuizContext = createContext<QuizContextValue | null>(null);

export interface QuizProviderProps {
  quiz: Quiz;
  initialQuestionIndex?: number;
  /** Pre-built session (e.g. for Storybook); must match quiz. */
  initialSession?: QuizSession;
  children: ReactNode;
  onQuestionSubmit?: (correct: boolean) => void;
  onQuestionChange?: (index: number) => void;
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

  const handleSetTextValue = useCallback(
    (value: string) => {
      setSession(setTextInput(session, session.currentQuestionIndex, value));
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
      setTextValue: handleSetTextValue,
    }),
    [
      session,
      progress,
      handleSubmitAnswer,
      handleGoToNext,
      handleGoToPrevious,
      handleReset,
      handleSelectChoice,
      handleSetTextValue,
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

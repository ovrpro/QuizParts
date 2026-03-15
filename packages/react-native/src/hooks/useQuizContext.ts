import { useContext } from 'react';
import { getQuizContext } from '../context/QuizContext.js';

const MISSING_PROVIDER =
  'Quiz hooks must be used within a QuizProvider. Wrap your app or quiz tree with <QuizProvider quiz={...}>.';

export const useQuizContext = () => {
  const ctx = useContext(getQuizContext());
  if (ctx == null) {
    throw new Error(MISSING_PROVIDER);
  }
  return ctx;
};

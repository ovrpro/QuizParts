/** @quizparts/react - React bindings for quiz engine */

export { CORE_VERSION } from '@quizparts/core';

export const REACT_VERSION = '0.0.1';

export { QuizProvider, getQuizContext, type QuizContextValue } from './context/QuizContext.js';
export { useQuizContext } from './hooks/useQuizContext.js';
export { useQuiz } from './hooks/useQuiz.js';
export { useQuestion } from './hooks/useQuestion.js';
export { useProgress } from './hooks/useProgress.js';

export { QuizRoot } from './components/QuizRoot.js';
export { Question } from './components/Question.js';
export { Prompt } from './components/Prompt.js';
export { Choices } from './components/Choices.js';
export { Choice } from './components/Choice.js';
export { SubmitButton } from './components/SubmitButton.js';
export { Feedback } from './components/Feedback.js';
export { Progress } from './components/Progress.js';
export { TextInput } from './components/TextInput.js';
export { NextButton } from './components/NextButton.js';
export { MatchPairs } from './components/MatchPairs.js';
export { OrderList } from './components/OrderList.js';
export { SentenceBuilder } from './components/SentenceBuilder.js';

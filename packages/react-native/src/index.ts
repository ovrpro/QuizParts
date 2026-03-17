/**
 * @quizparts/react-native – React Native bindings for the quiz engine.
 *
 * Use QuizProvider with a parsed quiz; use QuizFlow for the full flow, or compose
 * Question, DefaultQuestionLayout, QuestionInput, etc. Hooks: useQuiz, useQuestion, useProgress.
 */

export { CORE_VERSION } from '@quizparts/core';

export const REACT_NATIVE_VERSION = '0.0.1';

export { QuizProvider, getQuizContext, type QuizContextValue } from './context/QuizContext.js';
export { useQuizContext } from './hooks/useQuizContext.js';
export { useQuiz } from './hooks/useQuiz.js';
export { useQuestion } from './hooks/useQuestion.js';
export { useProgress } from './hooks/useProgress.js';

export { QuizRoot } from './components/QuizRoot.js';
export { Question } from './components/Question.js';
export { QuestionCard } from './components/QuestionCard.js';
export { QuestionHeader } from './components/QuestionHeader.js';
export { QuestionBody } from './components/QuestionBody.js';
export { QuestionFooter } from './components/QuestionFooter.js';
export { QuestionInput } from './components/QuestionInput.js';
export { Prompt } from './components/Prompt.js';
export { Instruction } from './components/Instruction.js';
export { QuizComplete } from './components/QuizComplete.js';
export { DefaultQuestionLayout } from './components/DefaultQuestionLayout.js';
export { QuizFlow } from './components/QuizFlow.js';
export { DEFAULT_INSTRUCTIONS } from './constants/defaultInstructions.js';
export { Hint } from './components/Hint.js';
export { Card } from './components/Card.js';
export { Choices } from './components/Choices.js';
export { Choice } from './components/Choice.js';
export { ChoiceIndicator } from './components/ChoiceIndicator.js';
export { SubmitButton } from './components/SubmitButton.js';
export { ContinueButton } from './components/ContinueButton.js';
export { Feedback } from './components/Feedback.js';
export { Progress } from './components/Progress.js';
export { ProgressBar } from './components/ProgressBar.js';
export { QuestionCounter } from './components/QuestionCounter.js';
export { TextInput } from './components/TextInput.js';
export { NextButton } from './components/NextButton.js';
export { MatchPairs } from './components/MatchPairs.js';
export { OrderList } from './components/OrderList.js';
export { SentenceBuilder } from './components/SentenceBuilder.js';

export { createQuizFromJson } from '@quizparts/schema';

export { useTheme, ThemeProvider } from './theme/ThemeContext.js';
export { defaultTheme } from './theme/defaultTheme.js';
export type { RNTheme } from './theme/defaultTheme.js';

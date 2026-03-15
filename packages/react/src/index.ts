/**
 * @quizparts/react – React bindings for the quiz engine.
 *
 * Wrap your app (or quiz section) in QuizProvider with a parsed quiz; use QuizRoot, Question,
 * Prompt, Choices, Choice, SubmitButton, Feedback, Progress, etc. for multiple_choice and
 * multi_select. Use TextInput for text_input, MatchPairs for match_pairs, OrderList for
 * order_items, SentenceBuilder for sentence_builder. Hooks: useQuiz, useQuestion, useProgress.
 */

export { CORE_VERSION } from '@quizparts/core';

/** Current React bindings version. */
export const REACT_VERSION = '0.0.1';

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
export { ThemeVarsProvider } from './components/ThemeVarsProvider.js';
export { QuizComplete } from './components/QuizComplete.js';
export { DEFAULT_INSTRUCTIONS } from './constants/defaultInstructions.js';
export { defaultTheme } from '@quizparts/theme';
export { Hint } from './components/Hint.js';
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

/** @quizparts/core - Headless quiz engine */

export { SCHEMA_VERSION } from '@quizparts/schema';

export const CORE_VERSION = '0.0.1';

export {
  createQuizSession,
  createInitialQuestionState,
  type QuizSession,
  type QuestionState,
  type QuestionStatus,
  type QuestionInputState,
} from './state.js';

export { checkCorrectness } from './correctness.js';

export {
  selectChoice,
  toggleChoice,
  setTextInput,
  setMatchPairs,
  setOrderedIds,
  submitAnswer,
  goToNextQuestion,
  goToPreviousQuestion,
  getProgress,
  resetQuiz,
  type Progress,
} from './actions.js';

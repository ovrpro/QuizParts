/** @quizparts/schema - Quiz types, validation, and parsing */

import type { Quiz } from './types.js';
export type { Quiz, QuizQuestion, QuestionType } from './types.js';
/** Schema type alias for the root quiz shape */
export type QuizSchema = Quiz;
export type {
  ValidationError,
  ParseResult,
  ValidateResult,
} from './validation.js';
export { parseQuiz, validateQuiz, createQuizFromJson } from './validation.js';

/** Current schema version (semver) */
export const SCHEMA_VERSION = '0.0.1';

// Re-export types for convenience
export type {
  Choice,
  MultipleChoiceQuestion,
  MultiSelectQuestion,
  TextInputQuestion,
  MatchPair,
  MatchPairsQuestion,
  OrderItem,
  OrderItemsQuestion,
  SentenceBuilderQuestion,
} from './types.js';

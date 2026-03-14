/** Quiz and question types for @quizparts/schema */

/** Choice option for multiple choice / multi-select */
export interface Choice {
  id: string;
  text: string;
}

/** Multiple choice: single correct choice by id */
export interface MultipleChoiceQuestion {
  type: 'multiple_choice';
  id: string;
  prompt: string;
  choices: Choice[];
  answer: string;
  explanation?: string;
}

/** Multi select: multiple correct choice ids */
export interface MultiSelectQuestion {
  type: 'multi_select';
  id: string;
  prompt: string;
  choices: Choice[];
  answer: string[];
  explanation?: string;
}

/** Text input: exact string match (trimmed, case-sensitive by default) */
export interface TextInputQuestion {
  type: 'text_input';
  id: string;
  prompt: string;
  answer: string;
  explanation?: string;
  /** If true, comparison is case-insensitive */
  caseInsensitive?: boolean;
}

/** One pair for match_pairs */
export interface MatchPair {
  left: string;
  right: string;
}

/** Match pairs: correct pairing of left/right items */
export interface MatchPairsQuestion {
  type: 'match_pairs';
  id: string;
  prompt: string;
  pairs: MatchPair[];
  /** Correct pairing as array of [left, right] in any order */
  answer: Array<[string, string]>;
  explanation?: string;
}

/** Order items: correct sequence of item ids */
export interface OrderItem {
  id: string;
  text: string;
}

export interface OrderItemsQuestion {
  type: 'order_items';
  id: string;
  prompt: string;
  items: OrderItem[];
  answer: string[];
  explanation?: string;
}

/** Union of all v1 question types */
export type QuizQuestion =
  | MultipleChoiceQuestion
  | MultiSelectQuestion
  | TextInputQuestion
  | MatchPairsQuestion
  | OrderItemsQuestion;

/** Root quiz shape */
export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

/** Question type discriminator for future expansion */
export type QuestionType = QuizQuestion['type'];

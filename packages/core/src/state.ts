/** Quiz session state - serializable, no DOM/React */

import type { Quiz } from '@quizparts/schema';

/** Lifecycle status for a single question */
export type QuestionStatus =
  | 'idle'
  | 'active'
  | 'answered'
  | 'correct'
  | 'incorrect'
  | 'complete';

/** User input state per question (by type) */
export interface QuestionInputState {
  /** multiple_choice */
  selectedChoiceId?: string | null;
  /** multi_select */
  selectedChoiceIds?: string[];
  /** text_input */
  text?: string;
  /** match_pairs: user's pairing as [left, right][] */
  matchPairs?: Array<[string, string]>;
  /** order_items: user's ordered id list */
  orderedIds?: string[];
  /** sentence_builder: user's ordered tile values */
  sentenceOrder?: string[];
}

/** State for one question in the session */
export interface QuestionState {
  status: QuestionStatus;
  input: QuestionInputState;
  /** Set after submit: true if correct */
  isCorrect?: boolean;
}

/** Full quiz session state */
export interface QuizSession {
  quiz: Quiz;
  currentQuestionIndex: number;
  questionStates: QuestionState[];
  /** Number of questions answered correctly */
  score: number;
  /** Number of questions that have been submitted */
  attemptedCount: number;
}

/** Create initial question state */
export const createInitialQuestionState = (): QuestionState => ({
  status: 'idle',
  input: {},
});

/** Build initial session from a parsed quiz */
export const createQuizSession = (quiz: Quiz): QuizSession => {
  const questionStates: QuestionState[] = quiz.questions.map(() =>
    createInitialQuestionState()
  );
  if (questionStates.length > 0) {
    questionStates[0]!.status = 'active';
  }
  return {
    quiz,
    currentQuestionIndex: 0,
    questionStates,
    score: 0,
    attemptedCount: 0,
  };
};

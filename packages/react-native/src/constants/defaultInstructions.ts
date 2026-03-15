import type { QuestionType } from '@quizparts/schema';

export const DEFAULT_INSTRUCTIONS: Record<QuestionType, string> = {
  multiple_choice: 'Choose one.',
  multi_select: 'Select all that apply.',
  text_input: 'Type your answer below.',
  match_pairs: 'Match the pairs.',
  order_items: 'Put these in order.',
  sentence_builder: 'Build the sentence from the tiles.',
};

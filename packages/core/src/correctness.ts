/** Correctness checking per question type - no DOM/React */

import type { QuizQuestion } from '@quizparts/schema';
import type { QuestionInputState } from './state.js';

/** Check if the user's input matches the correct answer for the given question */
export const checkCorrectness = (
  question: QuizQuestion,
  input: QuestionInputState
): boolean => {
  switch (question.type) {
    case 'multiple_choice':
      return input.selectedChoiceId === question.answer;
    case 'multi_select': {
      const selected = input.selectedChoiceIds ?? [];
      if (selected.length !== question.answer.length) return false;
      const set = new Set(question.answer);
      return selected.every((id) => set.has(id));
    }
    case 'text_input': {
      const text = (input.text ?? '').trim();
      const answer = question.answer.trim();
      return question.caseInsensitive
        ? text.toLowerCase() === answer.toLowerCase()
        : text === answer;
    }
    case 'match_pairs': {
      const pairs = input.matchPairs ?? [];
      if (pairs.length !== question.answer.length) return false;
      const normalizedAnswer = new Set(
        question.answer.map(([a, b]) => `${a}:${b}`)
      );
      return pairs.every(([l, r]) => normalizedAnswer.has(`${l}:${r}`));
    }
    case 'order_items': {
      const ordered = input.orderedIds ?? [];
      if (ordered.length !== question.answer.length) return false;
      return ordered.every((id, i) => id === question.answer[i]);
    }
    case 'sentence_builder': {
      const order = input.sentenceOrder ?? [];
      if (order.length !== question.answer.length) return false;
      return order.every((val, i) => val === question.answer[i]);
    }
    default:
      return false;
  }
};

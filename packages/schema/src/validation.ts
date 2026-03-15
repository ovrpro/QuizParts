/** Validation and parsing for @quizparts/schema */

import type { Quiz, QuizQuestion, Choice, OrderItem } from './types.js';

/** Human-readable validation error */
export interface ValidationError {
  path: string;
  message: string;
}

/** Result of parsing quiz data */
export type ParseResult =
  | { success: true; data: Quiz }
  | { success: false; errors: ValidationError[] };

/** Result of validating an already-parsed quiz */
export type ValidateResult =
  | { valid: true }
  | { valid: false; errors: ValidationError[] };

const err = (path: string, message: string): ValidationError => ({ path, message });

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null && !Array.isArray(x);
}

function isString(x: unknown): x is string {
  return typeof x === 'string';
}

function isArray(x: unknown): x is unknown[] {
  return Array.isArray(x);
}

function validateChoice(c: unknown, basePath: string): Choice | ValidationError[] {
  if (!isRecord(c)) {
    return [err(basePath, 'Choice must be an object')];
  }
  const errors: ValidationError[] = [];
  if (!isString(c.id) || c.id.length === 0) {
    errors.push(err(`${basePath}.id`, 'Choice id must be a non-empty string'));
  }
  if (!isString(c.text)) {
    errors.push(err(`${basePath}.text`, 'Choice text must be a string'));
  }
  if (errors.length > 0) return errors;
  return { id: c.id as string, text: c.text as string };
}

function validateMultipleChoice(q: Record<string, unknown>, basePath: string): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!isString(q.prompt)) {
    errors.push(err(`${basePath}.prompt`, 'prompt must be a string'));
  }
  if (!isArray(q.choices) || q.choices.length === 0) {
    errors.push(err(`${basePath}.choices`, 'choices must be a non-empty array'));
  } else {
    const choices: Choice[] = [];
    for (let i = 0; i < q.choices.length; i++) {
      const out = validateChoice(q.choices[i], `${basePath}.choices[${i}]`);
      if (Array.isArray(out)) errors.push(...out);
      else choices.push(out);
    }
    if (choices.length > 0 && !isString(q.answer)) {
      errors.push(err(`${basePath}.answer`, 'answer must be a string (choice id)'));
    } else if (choices.length > 0 && isString(q.answer)) {
      const ids = new Set(choices.map((c) => c.id));
      if (!ids.has(q.answer)) {
        errors.push(err(`${basePath}.answer`, `answer must be one of: ${[...ids].join(', ')}`));
      }
    }
  }
  return errors;
}

function validateMultiSelect(q: Record<string, unknown>, basePath: string): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!isString(q.prompt)) {
    errors.push(err(`${basePath}.prompt`, 'prompt must be a string'));
  }
  if (!isArray(q.choices) || q.choices.length === 0) {
    errors.push(err(`${basePath}.choices`, 'choices must be a non-empty array'));
  } else {
    const choices: Choice[] = [];
    for (let i = 0; i < q.choices.length; i++) {
      const out = validateChoice(q.choices[i], `${basePath}.choices[${i}]`);
      if (Array.isArray(out)) errors.push(...out);
      else choices.push(out);
    }
    if (!isArray(q.answer)) {
      errors.push(err(`${basePath}.answer`, 'answer must be an array of choice ids'));
    } else {
      const ids = new Set(choices.map((c) => c.id));
      for (let i = 0; i < q.answer.length; i++) {
        if (!isString(q.answer[i]) || !ids.has(q.answer[i] as string)) {
          errors.push(err(`${basePath}.answer[${i}]`, `must be one of: ${[...ids].join(', ')}`));
        }
      }
    }
  }
  return errors;
}

function validateTextInput(q: Record<string, unknown>, basePath: string): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!isString(q.prompt)) {
    errors.push(err(`${basePath}.prompt`, 'prompt must be a string'));
  }
  if (!isString(q.answer)) {
    errors.push(err(`${basePath}.answer`, 'answer must be a string'));
  }
  return errors;
}

function validateMatchPairs(q: Record<string, unknown>, basePath: string): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!isString(q.prompt)) {
    errors.push(err(`${basePath}.prompt`, 'prompt must be a string'));
  }
  if (!isArray(q.pairs) || q.pairs.length === 0) {
    errors.push(err(`${basePath}.pairs`, 'pairs must be a non-empty array'));
  }
  if (!isArray(q.answer)) {
    errors.push(err(`${basePath}.answer`, 'answer must be an array of [left, right] pairs'));
  }
  return errors;
}

function validateOrderItem(item: unknown, basePath: string): OrderItem | ValidationError[] {
  if (!isRecord(item) || !isString(item.id) || !isString(item.text)) {
    return [err(basePath, 'Item must be an object with id and text strings')];
  }
  return { id: item.id as string, text: item.text as string };
}

function validateOrderItems(q: Record<string, unknown>, basePath: string): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!isString(q.prompt)) {
    errors.push(err(`${basePath}.prompt`, 'prompt must be a string'));
  }
  if (!isArray(q.items) || q.items.length === 0) {
    errors.push(err(`${basePath}.items`, 'items must be a non-empty array'));
  } else {
    const itemIds = new Set<string>();
    for (let i = 0; i < (q.items as unknown[]).length; i++) {
      const out = validateOrderItem((q.items as unknown[])[i], `${basePath}.items[${i}]`);
      if (Array.isArray(out)) errors.push(...out);
      else itemIds.add(out.id);
    }
    if (!isArray(q.answer)) {
      errors.push(err(`${basePath}.answer`, 'answer must be an array of item ids in order'));
    } else {
      const answerIds = q.answer as string[];
      if (answerIds.length !== itemIds.size || answerIds.some((id) => !itemIds.has(id))) {
        errors.push(err(`${basePath}.answer`, 'answer must contain each item id exactly once'));
      }
    }
  }
  return errors;
}

function validateSentenceBuilder(q: Record<string, unknown>, basePath: string): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!isString(q.prompt)) {
    errors.push(err(`${basePath}.prompt`, 'prompt must be a string'));
  }
  if (!isArray(q.tiles) || q.tiles.length === 0) {
    errors.push(err(`${basePath}.tiles`, 'tiles must be a non-empty array of strings'));
  }
  if (!isArray(q.answer)) {
    errors.push(err(`${basePath}.answer`, 'answer must be an array of strings (correct order)'));
  }
  return errors;
}

const QUESTION_TYPES = new Set([
  'multiple_choice',
  'multi_select',
  'text_input',
  'match_pairs',
  'order_items',
  'sentence_builder',
]);

function validateQuestion(q: unknown, index: number): QuizQuestion | ValidationError[] {
  const basePath = `questions[${index}]`;
  if (!isRecord(q)) {
    return [err(basePath, 'Question must be an object')];
  }
  if (!isString(q.type)) {
    return [err(`${basePath}.type`, 'type must be a string')];
  }
  if (!QUESTION_TYPES.has(q.type as string)) {
    return [err(`${basePath}.type`, `type must be one of: ${[...QUESTION_TYPES].join(', ')}`)];
  }
  if (!isString(q.id) || (q.id as string).length === 0) {
    return [err(`${basePath}.id`, 'id must be a non-empty string')];
  }

  let typeErrors: ValidationError[] = [];
  switch (q.type) {
    case 'multiple_choice':
      typeErrors = validateMultipleChoice(q, basePath);
      break;
    case 'multi_select':
      typeErrors = validateMultiSelect(q, basePath);
      break;
    case 'text_input':
      typeErrors = validateTextInput(q, basePath);
      break;
    case 'match_pairs':
      typeErrors = validateMatchPairs(q, basePath);
      break;
    case 'order_items':
      typeErrors = validateOrderItems(q, basePath);
      break;
    case 'sentence_builder':
      typeErrors = validateSentenceBuilder(q, basePath);
      break;
    default:
      typeErrors = [err(`${basePath}.type`, 'Unknown question type')];
  }
  if (typeErrors.length > 0) return typeErrors;

  return q as unknown as QuizQuestion;
}

/** Parse and validate unknown data into a Quiz. Returns parse result with data or errors. */
export function parseQuiz(data: unknown): ParseResult {
  if (!isRecord(data)) {
    return { success: false, errors: [err('', 'Quiz must be an object')] };
  }
  const errors: ValidationError[] = [];
  if (!isString(data.id) || (data.id as string).length === 0) {
    errors.push(err('id', 'id must be a non-empty string'));
  }
  if (!isString(data.title)) {
    errors.push(err('title', 'title must be a string'));
  }
  if (!isArray(data.questions)) {
    errors.push(err('questions', 'questions must be an array'));
  } else {
    const questions: QuizQuestion[] = [];
    for (let i = 0; i < data.questions.length; i++) {
      const out = validateQuestion(data.questions[i], i);
      if (Array.isArray(out)) errors.push(...out);
      else questions.push(out);
    }
    if (errors.length === 0) {
      return {
        success: true,
        data: {
          id: data.id as string,
          title: data.title as string,
          questions,
        },
      };
    }
  }
  return { success: false, errors };
}

/** Validate an already-parsed quiz (e.g. cross-field consistency). */
export function validateQuiz(quiz: Quiz): ValidateResult {
  const errors: ValidationError[] = [];
  const seenIds = new Set<string>();
  for (let i = 0; i < quiz.questions.length; i++) {
    const q = quiz.questions[i];
    if (seenIds.has(q.id)) {
      errors.push(err(`questions[${i}].id`, `Duplicate question id: ${q.id}`));
    }
    seenIds.add(q.id);
  }
  if (errors.length > 0) return { valid: false, errors };
  return { valid: true };
}

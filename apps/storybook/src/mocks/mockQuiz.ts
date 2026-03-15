import { parseQuiz } from '@quizparts/schema';
import type { Quiz } from '@quizparts/schema';
import {
  createQuizSession,
  selectChoice,
  toggleChoice,
  setTextInput,
  setMatchPairs,
  setOrderedIds,
  setSentenceOrder,
  submitAnswer,
  goToNextQuestion,
} from '@quizparts/core';
import type { QuizSession } from '@quizparts/core';

const defaultQuizJson = {
  id: 'storybook-quiz',
  title: 'Storybook Quiz',
  questions: [
    {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'What is 2+2?',
      choices: [
        { id: 'a', text: '3' },
        { id: 'b', text: '4' },
        { id: 'c', text: '5' },
      ],
      answer: 'b',
      explanation: '2+2 equals 4.',
    },
    {
      id: 'q2',
      type: 'text_input',
      prompt: 'Type "hello".',
      answer: 'hello',
      explanation: 'You typed the correct word.',
    },
  ],
};

let cached: Quiz | null = null;

export const createMockQuiz = (overrides?: Partial<Quiz>): Quiz => {
  const result = parseQuiz(defaultQuizJson);
  if (!result.success) throw new Error('Mock quiz parse failed');
  const quiz = result.data;
  if (overrides) return { ...quiz, ...overrides };
  return quiz;
};

export const getDefaultMockQuiz = (): Quiz => {
  if (!cached) cached = createMockQuiz();
  return cached;
};

export const createMockQuestion = (type: 'multiple_choice' | 'text_input') => {
  const quiz = createMockQuiz({
    questions:
      type === 'multiple_choice'
        ? [
            {
              id: 'q1',
              type: 'multiple_choice' as const,
              prompt: 'Choose one',
              choices: [
                { id: 'a', text: 'Option A' },
                { id: 'b', text: 'Option B' },
              ],
              answer: 'b',
              explanation: 'B is correct.',
            },
          ]
        : [
            {
              id: 'q1',
              type: 'text_input' as const,
              prompt: 'Type your answer',
              answer: 'answer',
              explanation: 'Correct.',
            },
          ],
  });
  return quiz;
};

export const createSessionSelected = (quiz: Quiz): QuizSession => {
  let s = createQuizSession(quiz);
  s = selectChoice(s, 0, 'b');
  return s;
};

export const createSessionSubmittedCorrect = (quiz: Quiz): QuizSession => {
  let s = createQuizSession(quiz);
  s = selectChoice(s, 0, 'b');
  const { session } = submitAnswer(s);
  return session;
};

export const createSessionSubmittedIncorrect = (quiz: Quiz): QuizSession => {
  let s = createQuizSession(quiz);
  s = selectChoice(s, 0, 'a');
  const { session } = submitAnswer(s);
  return session;
};

export const createSessionProgressMiddle = (quiz: Quiz): QuizSession => {
  let s = createQuizSession(quiz);
  s = selectChoice(s, 0, 'b');
  const { session } = submitAnswer(s);
  return goToNextQuestion(session);
};

export const createSessionProgressComplete = (quiz: Quiz): QuizSession => {
  let s = createQuizSession(quiz);
  s = selectChoice(s, 0, 'b');
  const { session: s1 } = submitAnswer(s);
  let s2 = goToNextQuestion(s1);
  s2 = setTextInput(s2, 1, 'hello');
  const { session: s3 } = submitAnswer(s2);
  return goToNextQuestion(s3);
};

export const createMockMultiSelectQuiz = (): Quiz => {
  const result = parseQuiz({
    id: 'multiselect-quiz',
    title: 'Multi Select Quiz',
    questions: [
      {
        id: 'q1',
        type: 'multi_select',
        prompt: 'Select prime numbers',
        choices: [
          { id: '2', text: '2' },
          { id: '3', text: '3' },
          { id: '4', text: '4' },
          { id: '5', text: '5' },
        ],
        answer: ['2', '3', '5'],
        explanation: '2, 3, and 5 are prime.',
      },
    ],
  });
  if (!result.success) throw new Error('MultiSelect mock parse failed');
  return result.data;
};

export const createSessionMultiSelectPartial = (quiz: Quiz): QuizSession => {
  let s = createQuizSession(quiz);
  s = toggleChoice(s, 0, '2');
  s = toggleChoice(s, 0, '3');
  return s;
};

export const createSessionMultiSelectCorrect = (quiz: Quiz): QuizSession => {
  let s = createQuizSession(quiz);
  s = toggleChoice(s, 0, '2');
  s = toggleChoice(s, 0, '3');
  s = toggleChoice(s, 0, '5');
  const { session } = submitAnswer(s);
  return session;
};

export const createSessionMultiSelectIncorrect = (quiz: Quiz): QuizSession => {
  let s = createQuizSession(quiz);
  s = toggleChoice(s, 0, '2');
  s = toggleChoice(s, 0, '4');
  const { session } = submitAnswer(s);
  return session;
};

export const createMockMatchPairsQuiz = (): Quiz => {
  const result = parseQuiz({
    id: 'matchpairs-quiz',
    title: 'Match Pairs',
    questions: [
      {
        id: 'q1',
        type: 'match_pairs',
        prompt: 'Match the word to its translation.',
        pairs: [
          { left: 'gato', right: 'cat' },
          { left: 'perro', right: 'dog' },
          { left: 'caballo', right: 'horse' },
        ],
        answer: [['gato', 'cat'], ['perro', 'dog'], ['caballo', 'horse']],
        explanation: 'All correct!',
      },
    ],
  });
  if (!result.success) throw new Error('MatchPairs mock parse failed');
  return result.data;
};

export const createSessionMatchPairsPartial = (quiz: Quiz): QuizSession => {
  let s = createQuizSession(quiz);
  s = setMatchPairs(s, 0, [['gato', 'cat']]);
  return s;
};

export const createSessionMatchPairsComplete = (quiz: Quiz): QuizSession => {
  let s = createQuizSession(quiz);
  s = setMatchPairs(s, 0, [['gato', 'cat'], ['perro', 'dog'], ['caballo', 'horse']]);
  const { session } = submitAnswer(s);
  return session;
};

export const createMockOrderItemsQuiz = (): Quiz => {
  const result = parseQuiz({
    id: 'orderitems-quiz',
    title: 'Order Items',
    questions: [
      {
        id: 'q1',
        type: 'order_items',
        prompt: 'Arrange numbers in order.',
        items: [
          { id: '3', text: '3' },
          { id: '1', text: '1' },
          { id: '2', text: '2' },
        ],
        answer: ['1', '2', '3'],
        explanation: 'Correct order is 1, 2, 3.',
      },
    ],
  });
  if (!result.success) throw new Error('OrderItems mock parse failed');
  return result.data;
};

export const createSessionOrderItemsIncorrect = (quiz: Quiz): QuizSession => {
  let s = createQuizSession(quiz);
  s = setOrderedIds(s, 0, ['3', '1', '2']);
  const { session } = submitAnswer(s);
  return session;
};

export const createSessionOrderItemsCorrect = (quiz: Quiz): QuizSession => {
  let s = createQuizSession(quiz);
  s = setOrderedIds(s, 0, ['1', '2', '3']);
  const { session } = submitAnswer(s);
  return session;
};

export const createMockSentenceBuilderQuiz = (): Quiz => {
  const result = parseQuiz({
    id: 'sentencebuilder-quiz',
    title: 'Sentence Builder',
    questions: [
      {
        id: 'q1',
        type: 'sentence_builder',
        prompt: 'Translate: Estoy aprendiendo español',
        tiles: ['I', 'am', 'learning', 'Spanish'],
        answer: ['I', 'am', 'learning', 'Spanish'],
        explanation: 'Correct!',
      },
    ],
  });
  if (!result.success) throw new Error('SentenceBuilder mock parse failed');
  return result.data;
};

export const createSessionSentenceBuilderPartial = (quiz: Quiz): QuizSession => {
  let s = createQuizSession(quiz);
  s = setSentenceOrder(s, 0, ['I', 'am']);
  return s;
};

export const createSessionSentenceBuilderCorrect = (quiz: Quiz): QuizSession => {
  let s = createQuizSession(quiz);
  s = setSentenceOrder(s, 0, ['I', 'am', 'learning', 'Spanish']);
  const { session } = submitAnswer(s);
  return session;
};

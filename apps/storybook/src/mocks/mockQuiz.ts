import { parseQuiz } from '@quizparts/schema';
import type { Quiz } from '@quizparts/schema';
import {
  createQuizSession,
  selectChoice,
  setTextInput,
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

import { parseQuiz } from '@quizparts/schema';

const quizJson = {
  id: 'trivia',
  title: 'Trivia',
  questions: [
    {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'What is 2+2?',
      choices: [{ id: 'a', text: '3' }, { id: 'b', text: '4' }, { id: 'c', text: '5' }],
      answer: 'b',
      explanation: '2+2=4.',
    },
    {
      id: 'q2',
      type: 'multiple_choice',
      prompt: 'Capital of France?',
      choices: [{ id: 'a', text: 'Berlin' }, { id: 'b', text: 'Paris' }, { id: 'c', text: 'Madrid' }],
      answer: 'b',
      explanation: 'Paris.',
    },
  ],
};

const result = parseQuiz(quizJson);
export const quiz = result.success ? result.data : null;

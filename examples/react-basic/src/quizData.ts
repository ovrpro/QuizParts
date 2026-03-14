import { parseQuiz } from '@quizparts/schema';

const quizJson = {
  id: 'react-basic-quiz',
  title: 'Quick Quiz',
  questions: [
    {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'What is the capital of France?',
      choices: [
        { id: 'a', text: 'Berlin' },
        { id: 'b', text: 'Paris' },
        { id: 'c', text: 'Madrid' },
      ],
      answer: 'b',
      explanation: 'Paris is the capital of France.',
    },
    {
      id: 'q2',
      type: 'text_input',
      prompt: 'Type the word "hello".',
      answer: 'hello',
      explanation: 'You typed the correct word.',
    },
  ],
};

const result = parseQuiz(quizJson);
export const quiz = result.success ? result.data : null;

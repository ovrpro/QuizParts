import { parseQuiz } from '@quizparts/schema';

const result = parseQuiz({
  id: 'cert',
  title: 'Certification Practice',
  questions: [
    {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'Single best answer?',
      choices: [{ id: 'a', text: 'A' }, { id: 'b', text: 'B' }, { id: 'c', text: 'C' }],
      answer: 'b',
      explanation: 'B is correct.',
    },
    {
      id: 'q2',
      type: 'multi_select',
      prompt: 'Select all that apply.',
      choices: [{ id: 'x', text: 'X' }, { id: 'y', text: 'Y' }, { id: 'z', text: 'Z' }],
      answer: ['x', 'z'],
      explanation: 'X and Z.',
    },
    {
      id: 'q3',
      type: 'order_items',
      prompt: 'Arrange in order.',
      items: [{ id: '3', text: 'Third' }, { id: '1', text: 'First' }, { id: '2', text: 'Second' }],
      answer: ['1', '2', '3'],
      explanation: 'First, Second, Third.',
    },
  ],
});
export const quiz = result.success ? result.data : null;

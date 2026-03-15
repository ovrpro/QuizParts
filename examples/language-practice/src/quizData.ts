import { parseQuiz } from '@quizparts/schema';

const result = parseQuiz({
  id: 'lang',
  title: 'Language Practice',
  questions: [
    {
      id: 'q1',
      type: 'sentence_builder',
      prompt: 'Translate: Estoy aprendiendo español',
      tiles: ['I', 'am', 'learning', 'Spanish'],
      answer: ['I', 'am', 'learning', 'Spanish'],
      explanation: 'Correct!',
    },
    {
      id: 'q2',
      type: 'text_input',
      prompt: 'Type "hello" in Spanish.',
      answer: 'hola',
      explanation: 'Hola.',
    },
  ],
});
export const quiz = result.success ? result.data : null;

import { parseQuiz } from '@quizparts/schema';

const result = parseQuiz({
  id: 'vocab',
  title: 'Vocabulary Trainer',
  questions: [
    {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'What does "gato" mean?',
      choices: [{ id: 'a', text: 'dog' }, { id: 'b', text: 'cat' }, { id: 'c', text: 'horse' }],
      answer: 'b',
      explanation: 'Gato = cat.',
    },
    {
      id: 'q2',
      type: 'text_input',
      prompt: 'Type the Spanish word for "dog".',
      answer: 'perro',
      explanation: 'Perro.',
    },
    {
      id: 'q3',
      type: 'match_pairs',
      prompt: 'Match word to translation.',
      pairs: [{ left: 'gato', right: 'cat' }, { left: 'perro', right: 'dog' }],
      answer: [['gato', 'cat'], ['perro', 'dog']],
      explanation: 'Done!',
    },
  ],
});
export const quiz = result.success ? result.data : null;

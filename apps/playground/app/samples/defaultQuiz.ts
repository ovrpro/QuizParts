/** Default and sample quiz JSON for the playground editor */

export const defaultQuizJson = {
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

export type Sample = { id: string; label: string; data: object };

export const samples: Sample[] = [
  { id: 'quick', label: 'Quick Quiz', data: defaultQuizJson },
  {
    id: 'minimal',
    label: 'Minimal (one MC)',
    data: {
      id: 'minimal-quiz',
      title: 'One question',
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          prompt: 'True or false?',
          choices: [
            { id: 't', text: 'True' },
            { id: 'f', text: 'False' },
          ],
          answer: 't',
        },
      ],
    },
  },
];

export const getDefaultEditorValue = () => JSON.stringify(defaultQuizJson, null, 2);

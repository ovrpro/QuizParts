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

const multiSelectQuizJson = {
  id: 'multiselect-quiz',
  title: 'Multi Select',
  questions: [
    {
      id: 'q1',
      type: 'multi_select',
      prompt: 'Select prime numbers.',
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
};

export const samples: Sample[] = [
  { id: 'quick', label: 'Quick Quiz', data: defaultQuizJson },
  {
    id: 'text-input',
    label: 'Text Input',
    data: {
      id: 'textinput-quiz',
      title: 'Text Input',
      questions: [
        {
          id: 'q1',
          type: 'text_input',
          prompt: 'Type the word "hello".',
          answer: 'hello',
          explanation: 'Correct!',
        },
      ],
    },
  },
  {
    id: 'minimal',
    label: 'Multiple Choice (one)',
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
  { id: 'multi-select', label: 'Multi Select', data: multiSelectQuizJson },
  {
    id: 'match-pairs',
    label: 'Match Pairs',
    data: {
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
    },
  },
  {
    id: 'order-items',
    label: 'Order Items',
    data: {
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
    },
  },
  {
    id: 'sentence-builder',
    label: 'Sentence Builder',
    data: {
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
    },
  },
];

export const getDefaultEditorValue = () => JSON.stringify(defaultQuizJson, null, 2);

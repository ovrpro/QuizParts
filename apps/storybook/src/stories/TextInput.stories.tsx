import type { Meta, StoryObj } from '@storybook/react';
import {
  QuizRoot,
  Question,
  Prompt,
  TextInput,
  SubmitButton,
  Feedback,
} from '@quizparts/react';
import { createMockQuestion } from '../mocks/mockQuiz';

const quiz = createMockQuestion('text_input');

const meta: Meta<typeof TextInput> = {
  title: 'Primitives/TextInput',
  component: TextInput,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TextInput>;

const withContext = () => (
  <QuizRoot>
    <Question>
      <Prompt />
      <TextInput />
      <SubmitButton />
      <Feedback />
    </Question>
  </QuizRoot>
);

export const Default: Story = {
  parameters: { quiz },
  render: withContext,
};

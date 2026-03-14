import type { Meta, StoryObj } from '@storybook/react';
import { Feedback } from '@quizparts/react';
import {
  getDefaultMockQuiz,
  createSessionSubmittedCorrect,
  createSessionSubmittedIncorrect,
} from '../mocks/mockQuiz';

const quiz = getDefaultMockQuiz();

const meta: Meta<typeof Feedback> = {
  title: 'Primitives/Feedback',
  component: Feedback,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Feedback>;

export const BeforeSubmit: Story = {
  parameters: {},
};

export const Correct: Story = {
  parameters: {
    initialSession: createSessionSubmittedCorrect(quiz),
  },
};

export const Incorrect: Story = {
  parameters: {
    initialSession: createSessionSubmittedIncorrect(quiz),
  },
};

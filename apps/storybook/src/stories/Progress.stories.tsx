import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '@quizparts/react';
import {
  getDefaultMockQuiz,
  createSessionProgressMiddle,
  createSessionProgressComplete,
} from '../mocks/mockQuiz';

const quiz = getDefaultMockQuiz();

const meta: Meta<typeof Progress> = {
  title: 'Primitives/Progress',
  component: Progress,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Start: Story = {
  parameters: {},
};

export const Middle: Story = {
  parameters: {
    initialSession: createSessionProgressMiddle(quiz),
  },
};

export const Complete: Story = {
  parameters: {
    initialSession: createSessionProgressComplete(quiz),
  },
};

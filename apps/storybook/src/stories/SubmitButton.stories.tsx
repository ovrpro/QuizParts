import type { Meta, StoryObj } from '@storybook/react';
import { SubmitButton } from '@quizparts/react';
import { createSessionSelected, getDefaultMockQuiz } from '../mocks/mockQuiz';

const quiz = getDefaultMockQuiz();

const meta: Meta<typeof SubmitButton> = {
  title: 'Primitives/SubmitButton',
  component: SubmitButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SubmitButton>;

export const Disabled: Story = {
  parameters: {},
};

export const Enabled: Story = {
  parameters: {
    initialSession: createSessionSelected(quiz),
  },
};

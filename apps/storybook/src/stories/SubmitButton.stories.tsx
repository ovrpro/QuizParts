import type { Meta, StoryObj } from '@storybook/react';
import { Question, Prompt, Choices, Choice, SubmitButton } from '@quizparts/react';
import { createSessionSelected, getDefaultMockQuiz } from '../mocks/mockQuiz';

const quiz = getDefaultMockQuiz();

const meta: Meta<typeof SubmitButton> = {
  title: 'Primitives/SubmitButton',
  component: SubmitButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SubmitButton>;

const withQuestion = () => (
  <Question>
    <Prompt />
    <Choices>
      <Choice choiceId="a" />
      <Choice choiceId="b" />
    </Choices>
    <SubmitButton />
  </Question>
);

export const Disabled: Story = {
  parameters: { quiz },
  render: withQuestion,
};

export const Enabled: Story = {
  parameters: {
    quiz,
    initialSession: createSessionSelected(quiz),
  },
  render: withQuestion,
};

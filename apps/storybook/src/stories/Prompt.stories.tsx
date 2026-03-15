import type { Meta, StoryObj } from '@storybook/react';
import { Question, Prompt, Choices, Choice, SubmitButton } from '@quizparts/react';
import { getDefaultMockQuiz } from '../mocks/mockQuiz';

const meta: Meta<typeof Prompt> = {
  title: 'Primitives/Prompt',
  component: Prompt,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Prompt>;

export const Default: Story = {
  parameters: { quiz: getDefaultMockQuiz() },
  render: () => (
    <Question>
      <Prompt />
      <Choices>
        <Choice choiceId="a" />
        <Choice choiceId="b" />
      </Choices>
      <SubmitButton />
    </Question>
  ),
};
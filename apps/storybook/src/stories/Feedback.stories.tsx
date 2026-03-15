import type { Meta, StoryObj } from '@storybook/react';
import { Question, Prompt, Choices, Choice, SubmitButton, Feedback } from '@quizparts/react';
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

const withQuestion = () => (
  <Question>
    <Prompt />
    <Choices>
      <Choice choiceId="a" />
      <Choice choiceId="b" />
    </Choices>
    <SubmitButton />
    <Feedback />
  </Question>
);

export const BeforeSubmit: Story = {
  parameters: { quiz },
  render: withQuestion,
};

export const Correct: Story = {
  parameters: {
    quiz,
    initialSession: createSessionSubmittedCorrect(quiz),
  },
  render: withQuestion,
};

export const Incorrect: Story = {
  parameters: {
    quiz,
    initialSession: createSessionSubmittedIncorrect(quiz),
  },
  render: withQuestion,
};

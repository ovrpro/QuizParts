import type { Meta, StoryObj } from '@storybook/react';
import {
  QuizRoot,
  ProgressBar,
  Question,
  Prompt,
  Choices,
  Choice,
  SubmitButton,
} from '@quizparts/react';
import {
  getDefaultMockQuiz,
  createSessionProgressMiddle,
  createSessionProgressComplete,
} from '../mocks/mockQuiz';

const quiz = getDefaultMockQuiz();

const meta: Meta<typeof ProgressBar> = {
  title: 'Primitives/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

const withContext = () => (
  <QuizRoot>
    <ProgressBar />
    <Question>
      <Prompt />
      <Choices>
        <Choice choiceId="a" />
        <Choice choiceId="b" />
      </Choices>
      <SubmitButton />
    </Question>
  </QuizRoot>
);

export const Start: Story = {
  parameters: { quiz },
  render: withContext,
};

export const Middle: Story = {
  parameters: { quiz, initialSession: createSessionProgressMiddle(quiz) },
  render: withContext,
};

export const Complete: Story = {
  parameters: { quiz, initialSession: createSessionProgressComplete(quiz) },
  render: withContext,
};

import type { Meta, StoryObj } from '@storybook/react';
import {
  QuizRoot,
  QuestionCounter,
  Question,
  Prompt,
  Choices,
  Choice,
  SubmitButton,
} from '@quizparts/react';
import { getDefaultMockQuiz, createSessionProgressMiddle } from '../mocks/mockQuiz';

const quiz = getDefaultMockQuiz();

const meta: Meta<typeof QuestionCounter> = {
  title: 'Primitives/QuestionCounter',
  component: QuestionCounter,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof QuestionCounter>;

const withContext = () => (
  <QuizRoot>
    <Question>
      <QuestionCounter />
      <Prompt />
      <Choices>
        <Choice choiceId="a" />
        <Choice choiceId="b" />
      </Choices>
      <SubmitButton />
    </Question>
  </QuizRoot>
);

export const Default: Story = {
  parameters: { quiz },
  render: withContext,
};

export const Middle: Story = {
  parameters: { quiz, initialSession: createSessionProgressMiddle(quiz) },
  render: withContext,
};

export const CustomFormat: Story = {
  parameters: { quiz },
  render: () => (
    <QuizRoot>
      <Question>
        <QuestionCounter format="{current} / {total}" />
        <Prompt />
        <Choices>
          <Choice choiceId="a" />
          <Choice choiceId="b" />
        </Choices>
        <SubmitButton />
      </Question>
    </QuizRoot>
  ),
};

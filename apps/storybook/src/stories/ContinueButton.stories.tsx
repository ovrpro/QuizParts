import type { Meta, StoryObj } from '@storybook/react';
import {
  QuizRoot,
  Question,
  Prompt,
  Choices,
  Choice,
  SubmitButton,
  ContinueButton,
  Feedback,
} from '@quizparts/react';
import { getDefaultMockQuiz, createSessionSubmittedCorrect } from '../mocks/mockQuiz';

const quiz = getDefaultMockQuiz();

const meta: Meta<typeof ContinueButton> = {
  title: 'Primitives/ContinueButton',
  component: ContinueButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ContinueButton>;

const withContext = () => (
  <QuizRoot>
    <Question>
      <Prompt />
      <Choices>
        <Choice choiceId="a" />
        <Choice choiceId="b" />
      </Choices>
      <SubmitButton />
      <ContinueButton />
      <Feedback />
    </Question>
  </QuizRoot>
);

export const Default: Story = {
  parameters: { quiz },
  render: withContext,
};

export const AfterSubmit: Story = {
  parameters: { quiz, initialSession: createSessionSubmittedCorrect(quiz) },
  render: withContext,
};

export const CustomLabel: Story = {
  parameters: { quiz, initialSession: createSessionSubmittedCorrect(quiz) },
  render: () => (
    <QuizRoot>
      <Question>
        <Prompt />
        <Choices>
          <Choice choiceId="a" />
          <Choice choiceId="b" />
        </Choices>
        <SubmitButton />
        <ContinueButton>Next question</ContinueButton>
        <Feedback />
      </Question>
    </QuizRoot>
  ),
};

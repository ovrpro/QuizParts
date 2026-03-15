import type { Meta, StoryObj } from '@storybook/react';
import { Question, Prompt, SentenceBuilder, SubmitButton, NextButton, Feedback } from '@quizparts/react';
import {
  createMockSentenceBuilderQuiz,
  createSessionSentenceBuilderPartial,
  createSessionSentenceBuilderCorrect,
} from '../mocks/mockQuiz';

const quiz = createMockSentenceBuilderQuiz();

const meta: Meta = {
  title: 'Primitives/SentenceBuilder',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  parameters: { quiz },
  render: () => (
    <Question>
      <Prompt />
      <SentenceBuilder />
      <SubmitButton />
      <NextButton />
      <Feedback />
    </Question>
  ),
};

export const Partial: Story = {
  parameters: {
    quiz,
    initialSession: createSessionSentenceBuilderPartial(quiz),
  },
  render: () => (
    <Question>
      <Prompt />
      <SentenceBuilder />
      <SubmitButton />
      <NextButton />
      <Feedback />
    </Question>
  ),
};

export const Correct: Story = {
  parameters: {
    quiz,
    initialSession: createSessionSentenceBuilderCorrect(quiz),
  },
  render: () => (
    <Question>
      <Prompt />
      <SentenceBuilder />
      <SubmitButton />
      <NextButton />
      <Feedback />
    </Question>
  ),
};

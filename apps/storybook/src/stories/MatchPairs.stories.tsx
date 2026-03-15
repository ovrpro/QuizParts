import type { Meta, StoryObj } from '@storybook/react';
import { Question, Prompt, MatchPairs, SubmitButton, NextButton, Feedback } from '@quizparts/react';
import {
  createMockMatchPairsQuiz,
  createSessionMatchPairsPartial,
  createSessionMatchPairsComplete,
} from '../mocks/mockQuiz';

const quiz = createMockMatchPairsQuiz();

const meta: Meta = {
  title: 'Primitives/MatchPairs',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  parameters: { quiz },
  render: () => (
    <Question>
      <Prompt />
      <MatchPairs />
      <SubmitButton />
      <NextButton />
      <Feedback />
    </Question>
  ),
};

export const Partial: Story = {
  parameters: {
    quiz,
    initialSession: createSessionMatchPairsPartial(quiz),
  },
  render: () => (
    <Question>
      <Prompt />
      <MatchPairs />
      <SubmitButton />
      <NextButton />
      <Feedback />
    </Question>
  ),
};

export const Complete: Story = {
  parameters: {
    quiz,
    initialSession: createSessionMatchPairsComplete(quiz),
  },
  render: () => (
    <Question>
      <Prompt />
      <MatchPairs />
      <SubmitButton />
      <NextButton />
      <Feedback />
    </Question>
  ),
};

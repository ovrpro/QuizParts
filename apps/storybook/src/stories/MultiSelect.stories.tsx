import type { Meta, StoryObj } from '@storybook/react';
import { Question, Prompt, Choices, Choice, SubmitButton, NextButton, Feedback } from '@quizparts/react';
import {
  createMockMultiSelectQuiz,
  createSessionMultiSelectPartial,
  createSessionMultiSelectCorrect,
  createSessionMultiSelectIncorrect,
} from '../mocks/mockQuiz';

const quiz = createMockMultiSelectQuiz();

const meta: Meta = {
  title: 'Primitives/MultiSelect',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  parameters: { quiz },
  render: () => (
    <Question>
      <Prompt />
      <Choices>
        <Choice choiceId="2" />
        <Choice choiceId="3" />
        <Choice choiceId="4" />
        <Choice choiceId="5" />
      </Choices>
      <SubmitButton />
      <NextButton />
      <Feedback />
    </Question>
  ),
};

export const Partial: Story = {
  parameters: {
    quiz,
    initialSession: createSessionMultiSelectPartial(quiz),
  },
  render: () => (
    <Question>
      <Prompt />
      <Choices>
        <Choice choiceId="2" />
        <Choice choiceId="3" />
        <Choice choiceId="4" />
        <Choice choiceId="5" />
      </Choices>
      <SubmitButton />
      <NextButton />
      <Feedback />
    </Question>
  ),
};

export const Correct: Story = {
  parameters: {
    quiz,
    initialSession: createSessionMultiSelectCorrect(quiz),
  },
  render: () => (
    <Question>
      <Prompt />
      <Choices>
        <Choice choiceId="2" />
        <Choice choiceId="3" />
        <Choice choiceId="4" />
        <Choice choiceId="5" />
      </Choices>
      <SubmitButton />
      <NextButton />
      <Feedback />
    </Question>
  ),
};

export const Incorrect: Story = {
  parameters: {
    quiz,
    initialSession: createSessionMultiSelectIncorrect(quiz),
  },
  render: () => (
    <Question>
      <Prompt />
      <Choices>
        <Choice choiceId="2" />
        <Choice choiceId="3" />
        <Choice choiceId="4" />
        <Choice choiceId="5" />
      </Choices>
      <SubmitButton />
      <NextButton />
      <Feedback />
    </Question>
  ),
};

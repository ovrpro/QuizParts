import type { Meta, StoryObj } from '@storybook/react';
import { Question, Prompt, OrderList, SubmitButton, NextButton, Feedback } from '@quizparts/react';
import {
  createMockOrderItemsQuiz,
  createSessionOrderItemsIncorrect,
  createSessionOrderItemsCorrect,
} from '../mocks/mockQuiz';

const quiz = createMockOrderItemsQuiz();

const meta: Meta = {
  title: 'Primitives/OrderItems',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  parameters: { quiz },
  render: () => (
    <Question>
      <Prompt />
      <OrderList />
      <SubmitButton />
      <NextButton />
      <Feedback />
    </Question>
  ),
};

export const Incorrect: Story = {
  parameters: {
    quiz,
    initialSession: createSessionOrderItemsIncorrect(quiz),
  },
  render: () => (
    <Question>
      <Prompt />
      <OrderList />
      <SubmitButton />
      <NextButton />
      <Feedback />
    </Question>
  ),
};

export const Correct: Story = {
  parameters: {
    quiz,
    initialSession: createSessionOrderItemsCorrect(quiz),
  },
  render: () => (
    <Question>
      <Prompt />
      <OrderList />
      <SubmitButton />
      <NextButton />
      <Feedback />
    </Question>
  ),
};

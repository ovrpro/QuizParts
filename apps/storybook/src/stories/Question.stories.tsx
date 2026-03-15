import type { Meta, StoryObj } from '@storybook/react';
import { Question, Prompt, Choices, Choice, TextInput as TextInputField, SubmitButton, NextButton, Feedback } from '@quizparts/react';
import {
  createMockQuestion,
  createSessionSelected,
  createSessionSubmittedCorrect,
  createSessionSubmittedIncorrect,
} from '../mocks/mockQuiz';

const mcQuiz = createMockQuestion('multiple_choice');

const meta: Meta = {
  title: 'Primitives/Question',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

const mcRender = () => (
  <Question>
    <Prompt />
    <Choices>
      <Choice choiceId="a" />
      <Choice choiceId="b" />
    </Choices>
    <SubmitButton />
    <NextButton />
    <Feedback />
  </Question>
);

export const MultipleChoiceDefault: Story = {
  parameters: { quiz: mcQuiz },
  render: mcRender,
};

export const MultipleChoiceSelected: Story = {
  parameters: {
    quiz: mcQuiz,
    initialSession: createSessionSelected(mcQuiz),
  },
  render: mcRender,
};

export const MultipleChoiceCorrect: Story = {
  parameters: {
    quiz: mcQuiz,
    initialSession: createSessionSubmittedCorrect(mcQuiz),
  },
  render: mcRender,
};

export const MultipleChoiceIncorrect: Story = {
  parameters: {
    quiz: mcQuiz,
    initialSession: createSessionSubmittedIncorrect(mcQuiz),
  },
  render: mcRender,
};

export const TextInputQuestion: Story = {
  parameters: {
    quiz: createMockQuestion('text_input'),
  },
  render: () => (
    <Question>
      <Prompt />
      <TextInputField />
      <SubmitButton />
      <NextButton />
      <Feedback />
    </Question>
  ),
};

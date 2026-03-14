import type { Meta, StoryObj } from '@storybook/react';
import { Question, Prompt, Choices, Choice, TextInput as TextInputField, SubmitButton, NextButton, Feedback } from '@quizparts/react';
import { createMockQuestion } from '../mocks/mockQuiz';

const meta: Meta = {
  title: 'Primitives/Question',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const MultipleChoice: Story = {
  parameters: {
    quiz: createMockQuestion('multiple_choice'),
  },
  render: () => (
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
  ),
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

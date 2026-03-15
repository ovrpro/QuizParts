import type { Meta, StoryObj } from '@storybook/react';
import {
  QuizRoot,
  Question,
  Prompt,
  Instruction,
  Choices,
  Choice,
  SubmitButton,
} from '@quizparts/react';
import { getDefaultMockQuiz } from '../mocks/mockQuiz';

const quiz = getDefaultMockQuiz();

const meta: Meta<typeof Instruction> = {
  title: 'Primitives/Instruction',
  component: Instruction,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Instruction>;

const withContext = () => (
  <QuizRoot>
    <Question>
      <Prompt />
      <Instruction instruction="Select the correct answer." />
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

export const SelectAllThatApply: Story = {
  parameters: { quiz },
  render: () => (
    <QuizRoot>
      <Question>
        <Prompt />
        <Instruction instruction="Select all that apply." />
        <Choices>
          <Choice choiceId="a" />
          <Choice choiceId="b" />
        </Choices>
        <SubmitButton />
      </Question>
    </QuizRoot>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import {
  QuizRoot,
  Question,
  Prompt,
  Hint,
  Choices,
  Choice,
  SubmitButton,
} from '@quizparts/react';
import { getDefaultMockQuiz } from '../mocks/mockQuiz';

const quiz = getDefaultMockQuiz();

const meta: Meta<typeof Hint> = {
  title: 'Primitives/Hint',
  component: Hint,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Hint>;

const withContext = () => (
  <QuizRoot>
    <Question>
      <Prompt />
      <Choices>
        <Choice choiceId="a" />
        <Choice choiceId="b" />
      </Choices>
      <Hint hint="Think about basic arithmetic." />
      <SubmitButton />
    </Question>
  </QuizRoot>
);

export const Default: Story = {
  parameters: { quiz },
  render: withContext,
};

export const Hidden: Story = {
  parameters: { quiz },
  render: () => (
    <QuizRoot>
      <Question>
        <Prompt />
        <Hint hint="This hint is not shown." visible={false} />
        <Choices>
          <Choice choiceId="a" />
          <Choice choiceId="b" />
        </Choices>
        <SubmitButton />
      </Question>
    </QuizRoot>
  ),
};

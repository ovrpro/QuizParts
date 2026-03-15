import type { Meta, StoryObj } from '@storybook/react';
import {
  QuizRoot,
  Question,
  Prompt,
  Choices,
  Choice,
  ChoiceIndicator,
  SubmitButton,
  Feedback,
} from '@quizparts/react';
import {
  getDefaultMockQuiz,
  createSessionSelected,
  createSessionSubmittedCorrect,
  createSessionSubmittedIncorrect,
} from '../mocks/mockQuiz';

const quiz = getDefaultMockQuiz();

const meta: Meta<typeof ChoiceIndicator> = {
  title: 'Primitives/ChoiceIndicator',
  component: ChoiceIndicator,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ChoiceIndicator>;

const withContext = () => (
  <QuizRoot>
    <Question>
      <Prompt />
      <Choices>
        <Choice choiceId="a">
          <ChoiceIndicator choiceId="a" variant="radio" />
          {' Option A'}
        </Choice>
        <Choice choiceId="b">
          <ChoiceIndicator choiceId="b" variant="radio" />
          {' Option B'}
        </Choice>
      </Choices>
      <SubmitButton />
      <Feedback />
    </Question>
  </QuizRoot>
);

export const Default: Story = {
  parameters: { quiz },
  render: withContext,
};

export const Selected: Story = {
  parameters: { quiz, initialSession: createSessionSelected(quiz) },
  render: withContext,
};

export const Correct: Story = {
  parameters: { quiz, initialSession: createSessionSubmittedCorrect(quiz) },
  render: withContext,
};

export const Incorrect: Story = {
  parameters: { quiz, initialSession: createSessionSubmittedIncorrect(quiz) },
  render: withContext,
};

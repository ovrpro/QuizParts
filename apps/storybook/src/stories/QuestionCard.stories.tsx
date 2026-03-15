import type { Meta, StoryObj } from '@storybook/react';
import {
  QuizRoot,
  Question,
  QuestionCard,
  QuestionHeader,
  QuestionBody,
  QuestionFooter,
  QuestionCounter,
  Prompt,
  Choices,
  Choice,
  SubmitButton,
  ContinueButton,
  Feedback,
} from '@quizparts/react';
import { getDefaultMockQuiz } from '../mocks/mockQuiz';

const quiz = getDefaultMockQuiz();

const meta: Meta<typeof QuestionCard> = {
  title: 'Primitives/QuestionCard',
  component: QuestionCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof QuestionCard>;

const withContext = () => (
  <QuizRoot>
    <Question>
      <QuestionCard>
        <QuestionHeader>
          <QuestionCounter />
        </QuestionHeader>
        <QuestionBody>
          <Prompt />
          <Choices>
            <Choice choiceId="a" />
            <Choice choiceId="b" />
          </Choices>
        </QuestionBody>
        <QuestionFooter>
          <SubmitButton />
          <ContinueButton />
          <Feedback />
        </QuestionFooter>
      </QuestionCard>
    </Question>
  </QuizRoot>
);

export const Default: Story = {
  parameters: { quiz },
  render: withContext,
};

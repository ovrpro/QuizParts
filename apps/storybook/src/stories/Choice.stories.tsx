import type { Meta, StoryObj } from '@storybook/react';
import { Question, Prompt, Choices, Choice, SubmitButton, Feedback } from '@quizparts/react';
import {
  getDefaultMockQuiz,
  createSessionSelected,
  createSessionSubmittedCorrect,
  createSessionSubmittedIncorrect,
} from '../mocks/mockQuiz';

const quiz = getDefaultMockQuiz();

const meta: Meta<typeof Choice> = {
  title: 'Primitives/Choice',
  component: Choice,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Choice>;

const withQuestion = () => (
  <Question>
    <Prompt />
    <Choices>
      <Choice choiceId="a" />
      <Choice choiceId="b" />
      <Choice choiceId="c" />
    </Choices>
    <SubmitButton />
    <Feedback />
  </Question>
);

export const Default: Story = {
  parameters: { quiz },
  render: withQuestion,
};

export const Selected: Story = {
  parameters: {
    quiz,
    initialSession: createSessionSelected(quiz),
  },
  render: withQuestion,
};

export const Correct: Story = {
  parameters: {
    quiz,
    initialSession: createSessionSubmittedCorrect(quiz),
  },
  render: withQuestion,
};

export const Incorrect: Story = {
  parameters: {
    quiz,
    initialSession: createSessionSubmittedIncorrect(quiz),
  },
  render: withQuestion,
};

export const Disabled: Story = {
  parameters: {
    quiz,
    initialSession: createSessionSubmittedCorrect(quiz),
  },
  render: withQuestion,
};

export const LongLabel: Story = {
  parameters: {
    quiz: (() => {
      const q = getDefaultMockQuiz();
      const q0 = q.questions[0];
      if (q0 && 'choices' in q0) {
        return {
          ...q,
          questions: [
            {
              ...q0,
              choices: [
                { id: 'a', text: 'Short' },
                { id: 'b', text: 'This is a much longer choice label to test wrapping and layout in constrained widths.' },
              ],
            },
          ],
        };
      }
      return q;
    })(),
  },
  render: () => (
    <Question>
      <Prompt />
      <Choices>
        <Choice choiceId="a" />
        <Choice choiceId="b" />
      </Choices>
      <SubmitButton />
      <Feedback />
    </Question>
  ),
};

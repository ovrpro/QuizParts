import type { Meta, StoryObj } from '@storybook/react';
import { Choice } from '@quizparts/react';
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

export const Default: Story = {
  args: { choiceId: 'b' },
};

export const Selected: Story = {
  args: { choiceId: 'b' },
  parameters: {
    initialSession: createSessionSelected(quiz),
  },
};

export const Correct: Story = {
  args: { choiceId: 'b' },
  parameters: {
    initialSession: createSessionSubmittedCorrect(quiz),
  },
};

export const Incorrect: Story = {
  args: { choiceId: 'a' },
  parameters: {
    initialSession: createSessionSubmittedIncorrect(quiz),
  },
};

export const Disabled: Story = {
  args: { choiceId: 'a' },
  parameters: {
    initialSession: createSessionSubmittedCorrect(quiz),
  },
};

export const LongLabel: Story = {
  args: { choiceId: 'b' },
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
};

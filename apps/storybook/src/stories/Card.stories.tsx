import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@quizparts/react';

const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const WithTitle: Story = {
  render: () => (
    <Card title="Study tip">
      Review this concept after each practice session. Spaced repetition helps long-term retention.
    </Card>
  ),
};

export const BodyOnly: Story = {
  render: () => (
    <Card>
      Use this card for short learning notes, callouts, or any content without a heading.
    </Card>
  ),
};

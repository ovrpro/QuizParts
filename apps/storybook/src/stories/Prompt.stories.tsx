import type { Meta, StoryObj } from '@storybook/react';
import { Prompt } from '@quizparts/react';

const meta: Meta<typeof Prompt> = {
  title: 'Primitives/Prompt',
  component: Prompt,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Prompt>;

export const Default: Story = {};
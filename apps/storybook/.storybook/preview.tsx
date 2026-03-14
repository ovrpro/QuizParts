import type { Preview } from '@storybook/react';
import { withQuizProvider } from '../src/decorators/withQuizProvider';

const preview: Preview = {
  decorators: [withQuizProvider],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    layout: 'centered',
  },
};

export default preview;

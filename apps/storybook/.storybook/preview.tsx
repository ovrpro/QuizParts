import type { Preview } from '@storybook/react';
import '@quizparts/theme/play.css';
import { withQuizProvider } from '../src/decorators/withQuizProvider';
import { withTheme } from '../src/decorators/withTheme';

const preview: Preview = {
  decorators: [withTheme, withQuizProvider],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    layout: 'centered',
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for tokens',
      defaultValue: 'default',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'default', title: 'Play' },
          { value: 'calm', title: 'Calm' },
          { value: 'dark', title: 'Midnight' },
        ],
      },
    },
  },
};

export default preview;

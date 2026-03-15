import type { Preview } from '@storybook/react';
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
          { value: 'default', title: 'Default' },
          { value: 'dark', title: 'Dark' },
        ],
      },
    },
  },
};

export default preview;

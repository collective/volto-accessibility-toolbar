import React from 'react';
import Contrast from './Contrast';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

export default {
  title: 'Components/AccessibilityToolbar/Contrast',
  component: Contrast,
  argTypes: {
    contrast: {
      control: { type: 'select' },
      options: ['d', 'h'],
      description: 'Contrast mode (d: default, h: high contrast)',
    },
  },
};

const StoryComponent = (args) => (
  <Wrapper
    customStore={{
      accessibility: {
        contrast: args.contrast || 'd',
      },
    }}
  >
    <Contrast current={args.contrast} {...args} />
  </Wrapper>
);

export const Default = StoryComponent.bind({});
Default.args = {
  contrast: 'd',
};

export const HighContrast = StoryComponent.bind({});
HighContrast.args = {
  contrast: 'h',
};

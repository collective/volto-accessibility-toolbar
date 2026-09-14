import React from 'react';
import Fonts from './Fonts';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

export default {
  title: 'Components/AccessibilityToolbar/Fonts',
  component: Fonts,
  argTypes: {
    font: {
      control: { type: 'select' },
      options: ['s', 'm', 'l'],
      description: 'Font size (s: small, m: medium, l: large)',
    },
  },
};

const StoryComponent = (args) => (
  <Wrapper
    customStore={{
      accessibility: {
        font: args.font || 'm',
      },
    }}
  >
    <Fonts current={args.font} {...args} />
  </Wrapper>
);

export const Default = StoryComponent.bind({});
Default.args = {
  font: 'm',
};

export const SmallFont = StoryComponent.bind({});
SmallFont.args = {
  font: 's',
};

export const LargeFont = StoryComponent.bind({});
LargeFont.args = {
  font: 'l',
};

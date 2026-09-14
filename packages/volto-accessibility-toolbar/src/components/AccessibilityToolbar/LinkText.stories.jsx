import React from 'react';
import LinkText from './LinkText';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

export default {
  title: 'Components/AccessibilityToolbar/LinkText',
  component: LinkText,
  argTypes: {
    enabled: {
      control: { type: 'boolean' },
      description: 'Enable or disable link navigation',
    },
    href: {
      control: { type: 'text' },
      description: 'Link URL destination',
    },
  },
};

const StoryComponent = (args) => (
  <Wrapper>
    <LinkText {...args} />
  </Wrapper>
);

export const Default = StoryComponent.bind({});
Default.args = {
  enabled: true,
  href: '/accessibility',
};

export const DisabledLink = StoryComponent.bind({});
DisabledLink.args = {
  enabled: false,
  href: '/accessibility',
};

import React from 'react';
import AccessibilityToolbar from './AccessibilityToolbar';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

export default {
  title: 'Components/AccessibilityToolbar',
  component: AccessibilityToolbar,
  argTypes: {
    contrast: {
      control: { type: 'select' },
      options: ['d', 'h'],
      description: 'Modo de contraste (d: por defecto, h: alto contraste)',
    },
    font: {
      control: { type: 'select' },
      options: ['s', 'm', 'l'],
      description: 'Tamaño de fuente (s: pequeño, m: medio, l: grande)',
    },
  },
};

function StoryComponent(args) {
  return (
    <Wrapper
      customStore={{
        accessibility: {
          contrast: args.contrast || 'd',
          font: args.font || 'm',
        },
      }}
    >
      <AccessibilityToolbar {...args} />
    </Wrapper>
  );
}

export const Default = StoryComponent.bind({});
Default.args = {
  contrast: 'd',
  font: 'm',
};

export const HighContrast = StoryComponent.bind({});
HighContrast.args = {
  contrast: 'h',
  font: 'm',
};

export const LargeFont = StoryComponent.bind({});
LargeFont.args = {
  contrast: 'd',
  font: 'l',
};

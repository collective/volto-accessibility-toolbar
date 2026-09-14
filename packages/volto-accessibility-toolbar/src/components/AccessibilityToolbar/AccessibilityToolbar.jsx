/**
 * AccessibilityToolbar component.
 * @module components/AccessibilityToolbar/AccessibilityToolbar
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@plone/components';
import BodyClass from '@plone/volto/helpers/BodyClass/BodyClass';
import config from '@plone/volto/registry';
import { setAccessibility } from '../../actions/Accessibility/Accessibility';
import { Contrast, Fonts, LinkText } from './index';

// AccessibilityToolbar component
const AccessibilityToolbar = () => {
  const accessibility = useSelector((state) => state.accessibility) || {
    contrast: 'd',
    font: 'm',
  };
  const settings = config.settings || {};
  const dispatch = useDispatch();

  // Handle contrast change
  const handleContrastClick = (value = 'd') => {
    dispatch(setAccessibility(value, accessibility.font || 'm'));
  };

  // Handle font size change
  const handleFontClick = (value = 'm') => {
    dispatch(setAccessibility(accessibility.contrast || 'd', value));
  };

  return (
    <Container className={'toolbar-wrapper'}>
      <BodyClass
        className={`a18n-contrast-${accessibility.contrast || 'd'} a18n-font-${accessibility.font || 'm'}`}
      />
      <Container layout className={'toolbar'}>
        {settings.enable_link && (
          <LinkText enabled={settings.enable_link} href={settings.link_url} />
        )}
        {settings.enable_contrast && (
          <Contrast
            current={accessibility.contrast}
            onClick={handleContrastClick}
            applyBodyClass={false}
          />
        )}
        {settings.enable_font && (
          <Fonts
            current={accessibility.font}
            onClick={handleFontClick}
            applyBodyClass={false}
          />
        )}
      </Container>
    </Container>
  );
};

export { AccessibilityToolbar };
export default AccessibilityToolbar;

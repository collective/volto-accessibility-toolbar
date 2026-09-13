/**
 * AccessibilityToolbar component.
 * @module components/AccessibilityToolbar/AccessibilityToolbar
 */

import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@plone/components';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import BodyClass from '@plone/volto/helpers/BodyClass/BodyClass';
import config from '@plone/volto/registry';
import { setAccessibility } from '../../actions/Accessibility/Accessibility';
import accessibilityIcon from '../../icons/accessibility.svg';
import activeContrastIcon from '../../icons/contrast-a.svg';
import disabledContrastIcon from '../../icons/contrast-d.svg';

const messages = defineMessages({
  accessibilityLink: {
    id: 'accessibility_link',
    defaultMessage: 'Accessibility',
  },
  accessibilityLinkTitle: {
    id: 'accessibility_link_title',
    defaultMessage: 'Accessibility Link',
  },
  largeFontButton: {
    id: 'large_font_button',
    defaultMessage: 'Large Font',
  },
  mediumFontButton: {
    id: 'medium_font_button',
    defaultMessage: 'Medium Font',
  },
  smallFontButton: {
    id: 'small_font_button',
    defaultMessage: 'Small Font',
  },
  contrastLink: {
    id: 'contrast_link',
    defaultMessage: 'High Contrast',
  },
});

const ContrastIcons = {
  h: activeContrastIcon,
  d: disabledContrastIcon,
};

// Accessibility Link Text Component
const LinkText = ({ enabled, href, ...props }) => {
  const intl = useIntl();
  return (
    <Container className={'option link text'}>
      {enabled ? (
        <UniversalLink href={href} {...props}>
          <Icon
            name={accessibilityIcon}
            size={'16px'}
            title={intl.formatMessage(messages.accessibilityLinkTitle)}
            className={'icon'}
          />
          <span className={'label'}>
            {intl.formatMessage(messages.accessibilityLink)}
          </span>
        </UniversalLink>
      ) : (
        <>
          <Icon
            name={accessibilityIcon}
            size={'16px'}
            title={intl.formatMessage(messages.accessibilityLinkTitle)}
            className={'icon'}
          />
          <span className={'label'}>
            {intl.formatMessage(messages.accessibilityLink)}
          </span>
        </>
      )}
    </Container>
  );
};

// Contrast component
const Contrast = ({ current, onClick }) => {
  const intl = useIntl();
  const iconName = ContrastIcons[current] || disabledContrastIcon;
  const value = current === 'd' ? 'h' : 'd';
  const handleClick = (e) => {
    let target = e.target;
    if (target.nodeName === 'svg') {
      target = target.parentNode;
    }
    const { value } = target;
    onClick(value);
  };
  return (
    <Container className={'option contrast'}>
      <button value={value} onClick={handleClick}>
        <Icon
          name={iconName}
          size={'16px'}
          title={intl.formatMessage(messages.contrastLink)}
          className={'icon'}
        />
      </button>
    </Container>
  );
};

// Fonts component
const Fonts = ({ current, onClick }) => {
  const intl = useIntl();
  const fonts = [
    ['l', 'A+', intl.formatMessage(messages.largeFontButton)],
    ['m', 'A', intl.formatMessage(messages.mediumFontButton)],
    ['s', 'A-', intl.formatMessage(messages.smallFontButton)],
  ];
  const handleClick = (e) => {
    const { value } = e.target;
    onClick(value);
  };
  return (
    <Container className={'option font'}>
      {fonts.map((item, idx) => {
        const value = item[0];
        const label = item[1];
        const title = item[2];
        const options = {
          value: value,
          onClick: handleClick,
        };
        return (
          <button key={idx} {...options} title={title}>
            {label}
          </button>
        );
      })}
    </Container>
  );
};

// AccessibilityToolbar component
const AccessibilityToolbar = () => {
  const accessibility = useSelector((state) => state.accessibility);
  const settings = config.settings;
  const dispatch = useDispatch();
  const handleContrastClick = (value) => {
    if (value === undefined) {
      value = 'd';
    }
    dispatch(setAccessibility(value, accessibility.font));
  };

  const handleFontClick = (value) => {
    if (value === undefined) {
      value = 'm';
    }
    dispatch(setAccessibility(accessibility.contrast, value));
  };
  return (
    <Container className={'toolbar-wrapper'}>
      <BodyClass
        className={`a18n-contrast-${accessibility.contrast} a18n-font-${accessibility.font}`}
      />
      <Container layout className={'toolbar'}>
        {settings.enable_link && (
          <LinkText enabled={settings.enable_link} href={settings.link_url} />
        )}
        {settings.enable_contrast && (
          <Contrast
            current={accessibility.contrast}
            onClick={handleContrastClick}
          />
        )}
        {settings.enable_font && (
          <Fonts current={accessibility.font} onClick={handleFontClick} />
        )}
      </Container>
    </Container>
  );
};

export default AccessibilityToolbar;

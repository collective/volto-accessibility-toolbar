/**
 * Fonts component.
 * @module components/AccessibilityToolbar/Fonts
 */

import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@plone/components';
import BodyClass from '@plone/volto/helpers/BodyClass/BodyClass';
import { setFont } from '../../actions/Accessibility/Accessibility';

const messages = defineMessages({
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
});

// Fonts component
const Fonts = ({ current, onClick, applyBodyClass = true }) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const reduxFont = useSelector((state) => state.accessibility?.font || 'm');
  const activeFont = current !== undefined ? current : reduxFont;

  const fonts = [
    ['l', 'A+', intl.formatMessage(messages.largeFontButton)],
    ['m', 'A', intl.formatMessage(messages.mediumFontButton)],
    ['s', 'A-', intl.formatMessage(messages.smallFontButton)],
  ];

  const handleClick = (value) => {
    if (typeof onClick === 'function') {
      onClick(value);
    } else {
      dispatch(setFont(value));
    }
  };

  return (
    <>
      {applyBodyClass && <BodyClass className={`a18n-font-${activeFont}`} />}
      <Container className={'option font'}>
        {fonts.map((item, idx) => {
          const [value, label, title] = item;
          return (
            <button
              key={idx}
              value={value}
              onClick={() => handleClick(value)}
              title={title}
              aria-pressed={activeFont === value}
              className={activeFont === value ? 'active' : undefined}
            >
              {label}
            </button>
          );
        })}
      </Container>
    </>
  );
};

export { Fonts };
export default Fonts;

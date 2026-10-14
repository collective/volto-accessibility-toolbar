/**
 * HighContrast component.
 * @module components/AccessibilityToolbar/HighContrast
 */

import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@plone/components';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import BodyClass from '@plone/volto/helpers/BodyClass/BodyClass';
import { setHighContrast } from '../../actions/Accessibility/Accessibility';
import activeHighContrastIcon from '../../icons/high_contrast_a.svg';
import disabledHighContrastIcon from '../../icons/high_contrast_d.svg';

const messages = defineMessages({
  highContrastButton: {
    id: 'high_contrast_button',
    defaultMessage: 'High Contrast',
  },
});

// HighContrast icons mapping
const HighContrastIcons = {
  h: activeHighContrastIcon,
  d: disabledHighContrastIcon,
};

// HighContrast component
const HighContrast = ({ current, onClick, applyBodyClass = true }) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const reduxHighContrast = useSelector(
    (state) => state.accessibility?.contrast || 'd',
  );
  const activeHighContrast =
    current !== undefined ? current : reduxHighContrast;

  const iconName =
    HighContrastIcons[activeHighContrast] || disabledHighContrastIcon;
  const nextValue = activeHighContrast === 'd' ? 'h' : 'd';

  const handleClick = (e) => {
    let target = e.target;
    if (target.nodeName === 'svg') {
      target = target.parentNode;
    }
    const val = target.value || nextValue;
    if (typeof onClick === 'function') {
      onClick(val);
    } else {
      dispatch(setHighContrast(val));
    }
  };

  return (
    <>
      {applyBodyClass && (
        <BodyClass className={`a18n-contrast-${activeHighContrast}`} />
      )}
      <Container className={'option contrast'}>
        <button value={nextValue} onClick={handleClick}>
          <Icon
            name={iconName}
            size={'16px'}
            title={intl.formatMessage(messages.highContrastButton)}
            className={'icon'}
          />
        </button>
      </Container>
    </>
  );
};

export { HighContrast };
export default HighContrast;

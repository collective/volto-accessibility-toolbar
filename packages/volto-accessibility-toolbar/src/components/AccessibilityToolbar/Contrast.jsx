/**
 * Contrast component.
 * @module components/AccessibilityToolbar/Contrast
 */

import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@plone/components';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import BodyClass from '@plone/volto/helpers/BodyClass/BodyClass';
import { setContrast } from '../../actions/Accessibility/Accessibility';
import activeContrastIcon from '../../icons/contrast-a.svg';
import disabledContrastIcon from '../../icons/contrast-d.svg';

const messages = defineMessages({
  contrastLink: {
    id: 'contrast_link',
    defaultMessage: 'High Contrast',
  },
});

// Contrast icons mapping
const ContrastIcons = {
  h: activeContrastIcon,
  d: disabledContrastIcon,
};

// Contrast component
const Contrast = ({ current, onClick, applyBodyClass = true }) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const reduxContrast = useSelector(
    (state) => state.accessibility?.contrast || 'd',
  );
  const activeContrast = current !== undefined ? current : reduxContrast;

  const iconName = ContrastIcons[activeContrast] || disabledContrastIcon;
  const nextValue = activeContrast === 'd' ? 'h' : 'd';

  const handleClick = (e) => {
    let target = e.target;
    if (target.nodeName === 'svg') {
      target = target.parentNode;
    }
    const val = target.value || nextValue;
    if (typeof onClick === 'function') {
      onClick(val);
    } else {
      dispatch(setContrast(val));
    }
  };

  return (
    <>
      {applyBodyClass && (
        <BodyClass className={`a18n-contrast-${activeContrast}`} />
      )}
      <Container className={'option contrast'}>
        <button value={nextValue} onClick={handleClick}>
          <Icon
            name={iconName}
            size={'16px'}
            title={intl.formatMessage(messages.contrastLink)}
            className={'icon'}
          />
        </button>
      </Container>
    </>
  );
};

export { Contrast };
export default Contrast;

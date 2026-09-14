/**
 * LinkText component.
 * @module components/AccessibilityToolbar/LinkText
 */

import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Container } from '@plone/components';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import config from '@plone/volto/registry';
import accessibilityIcon from '../../icons/accessibility.svg';

const messages = defineMessages({
  accessibilityLink: {
    id: 'accessibility_link',
    defaultMessage: 'Accessibility',
  },
  accessibilityLinkTitle: {
    id: 'accessibility_link_title',
    defaultMessage: 'Accessibility Link',
  },
});

// Accessibility Link Text Component
const LinkText = ({ enabled, href, ...props }) => {
  const intl = useIntl();
  const settings = config.settings || {};
  const isEnabled = enabled !== undefined ? enabled : settings.enable_link;
  const linkHref = href !== undefined ? href : settings.link_url;

  return (
    <Container className={'option link text'}>
      {isEnabled ? (
        <UniversalLink href={linkHref} {...props}>
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

export { LinkText };
export default LinkText;

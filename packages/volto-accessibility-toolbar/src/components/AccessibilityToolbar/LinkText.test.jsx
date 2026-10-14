import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import LinkText from './LinkText';

jest.mock('@plone/volto/components/theme/Icon/Icon', () =>
  function Icon({ title, className }) {
    return <span className={className}>{title}</span>;
  },
);
jest.mock(
  '@plone/volto/components/manage/UniversalLink/UniversalLink',
  () =>
    function UniversalLink({ href, children }) {
      return <a href={href}>{children}</a>;
    },
);
jest.mock('@plone/volto/registry', () => ({
  default: { settings: {} },
  settings: {},
}));
jest.mock('@plone/components', () => ({
  Container: ({ children, className }) => (
    <div className={className}>{children}</div>
  ),
}));

const renderLinkText = (props = {}) =>
  render(
    <IntlProvider locale="en" messages={{}}>
      <LinkText {...props} />
    </IntlProvider>,
  );

describe('LinkText component', () => {
  it('renders the accessibility label', () => {
    renderLinkText({ enabled: false });
    expect(screen.getByText('Accessibility')).toBeInTheDocument();
  });

  it('renders an anchor when enabled is true', () => {
    renderLinkText({ enabled: true, href: '/accessibility' });
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/accessibility');
  });

  it('does not render an anchor when enabled is false', () => {
    renderLinkText({ enabled: false });
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders icon title text', () => {
    renderLinkText({ enabled: false });
    expect(screen.getByText('Accessibility Link')).toBeInTheDocument();
  });

  it('renders icon and label inside the link when enabled', () => {
    renderLinkText({ enabled: true, href: '/a11y' });
    const link = screen.getByRole('link');
    expect(link).toHaveTextContent('Accessibility Link');
    expect(link).toHaveTextContent('Accessibility');
  });
});

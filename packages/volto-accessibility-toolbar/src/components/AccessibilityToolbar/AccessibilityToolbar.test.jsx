import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import configureStore from 'redux-mock-store';
import config from '@plone/volto/registry';
import AccessibilityToolbar from './AccessibilityToolbar';

jest.mock('@plone/volto/helpers/BodyClass/BodyClass', () => () => null);
jest.mock('@plone/components', () => ({
  Container: ({ children, className }) => (
    <div className={className}>{children}</div>
  ),
}));
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

const mockStore = configureStore();

const renderToolbar = (storeState = {}) => {
  const store = mockStore({
    accessibility: { contrast: 'd', font: 'm', ...storeState },
  });
  return {
    store,
    ...render(
      <Provider store={store}>
        <IntlProvider locale="en" messages={{}}>
          <AccessibilityToolbar />
        </IntlProvider>
      </Provider>,
    ),
  };
};

describe('AccessibilityToolbar component', () => {
  let savedSettings;

  beforeAll(() => {
    savedSettings = { ...config.settings };
    config.settings.enable_link = true;
    config.settings.link_url = '/accessibility';
    config.settings.enable_high_contrast = true;
    config.settings.enable_font = true;
  });

  afterAll(() => {
    delete config.settings.enable_link;
    delete config.settings.link_url;
    delete config.settings.enable_high_contrast;
    delete config.settings.enable_font;
  });

  it('renders without errors', () => {
    const { container } = renderToolbar();
    expect(container.querySelector('.toolbar-wrapper')).toBeInTheDocument();
  });

  it('renders the Fonts sub-component (font buttons)', () => {
    renderToolbar();
    expect(screen.getByTitle('Large Font')).toBeInTheDocument();
    expect(screen.getByTitle('Medium Font')).toBeInTheDocument();
    expect(screen.getByTitle('Small Font')).toBeInTheDocument();
  });

  it('renders the HighContrast sub-component', () => {
    renderToolbar();
    expect(screen.getByText('High Contrast')).toBeInTheDocument();
  });

  it('renders the LinkText sub-component', () => {
    renderToolbar();
    expect(screen.getByText('Accessibility')).toBeInTheDocument();
  });

  it('dispatches setAccessibility when a font button is clicked', () => {
    const { store } = renderToolbar();
    fireEvent.click(screen.getByTitle('Large Font'));
    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0]).toMatchObject({ type: 'SET_ACCESSIBILITY', font: 'l' });
  });

  it('dispatches setAccessibility when the contrast button is clicked', () => {
    const { store } = renderToolbar({ contrast: 'd' });
    fireEvent.click(screen.getByRole('button', { name: 'High Contrast' }));
    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0]).toMatchObject({
      type: 'SET_ACCESSIBILITY',
      high_contrast: 'h',
    });
  });
});

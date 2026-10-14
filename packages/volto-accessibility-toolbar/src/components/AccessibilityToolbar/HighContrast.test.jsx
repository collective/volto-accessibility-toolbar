import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import configureStore from 'redux-mock-store';
import HighContrast from './HighContrast';

jest.mock('@plone/volto/helpers/BodyClass/BodyClass', () => () => null);
jest.mock('@plone/volto/components/theme/Icon/Icon', () =>
  function Icon({ title, className }) {
    return <span className={className}>{title}</span>;
  },
);
jest.mock('@plone/components', () => ({
  Container: ({ children, className }) => (
    <div className={className}>{children}</div>
  ),
}));

const mockStore = configureStore();

const renderHighContrast = (props = {}, storeState = {}) => {
  const store = mockStore({
    accessibility: { contrast: 'd', font: 'm', ...storeState },
  });
  return {
    store,
    ...render(
      <Provider store={store}>
        <IntlProvider locale="en" messages={{}}>
          <HighContrast {...props} />
        </IntlProvider>
      </Provider>,
    ),
  };
};

describe('HighContrast component', () => {
  it('renders without errors', () => {
    renderHighContrast({ current: 'd' });
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders the icon title', () => {
    renderHighContrast({ current: 'd' });
    expect(screen.getByText('High Contrast')).toBeInTheDocument();
  });

  it('calls onClick with next value (d→h) when button is clicked', () => {
    const onClick = jest.fn();
    renderHighContrast({ current: 'd', onClick });
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledWith('h');
  });

  it('calls onClick with next value (h→d) when active', () => {
    const onClick = jest.fn();
    renderHighContrast({ current: 'h', onClick });
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledWith('d');
  });

  it('dispatches setHighContrast when no onClick prop is provided', () => {
    const { store } = renderHighContrast({ current: 'd' });
    fireEvent.click(screen.getByRole('button'));
    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0]).toMatchObject({
      type: 'SET_ACCESSIBILITY',
      contrast: 'h',
    });
  });

  it('uses redux state when current prop is not provided', () => {
    const onClick = jest.fn();
    renderHighContrast({ onClick }, { contrast: 'h' });
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledWith('d');
  });
});

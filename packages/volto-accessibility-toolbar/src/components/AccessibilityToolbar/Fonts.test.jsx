import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import configureStore from 'redux-mock-store';
import Fonts from './Fonts';

jest.mock('@plone/volto/helpers/BodyClass/BodyClass', () => () => null);
jest.mock('@plone/components', () => ({
  Container: ({ children, className }) => (
    <div className={className}>{children}</div>
  ),
}));

const mockStore = configureStore();

const renderFonts = (props = {}, storeState = {}) => {
  const store = mockStore({
    accessibility: { contrast: 'd', font: 'm', ...storeState },
  });
  return {
    store,
    ...render(
      <Provider store={store}>
        <IntlProvider locale="en" messages={{}}>
          <Fonts {...props} />
        </IntlProvider>
      </Provider>,
    ),
  };
};

describe('Fonts component', () => {
  it('renders three font buttons', () => {
    renderFonts();
    expect(screen.getByTitle('Large Font')).toBeInTheDocument();
    expect(screen.getByTitle('Medium Font')).toBeInTheDocument();
    expect(screen.getByTitle('Small Font')).toBeInTheDocument();
  });

  it('marks the active font with aria-pressed=true', () => {
    renderFonts({ current: 'l' });
    expect(screen.getByTitle('Large Font')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByTitle('Medium Font')).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('marks active font from redux state when current prop is not provided', () => {
    renderFonts({}, { font: 's' });
    expect(screen.getByTitle('Small Font')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByTitle('Large Font')).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('calls onClick prop with the correct font value', () => {
    const onClick = jest.fn();
    renderFonts({ current: 'm', onClick });
    fireEvent.click(screen.getByTitle('Large Font'));
    expect(onClick).toHaveBeenCalledWith('l');
  });

  it('dispatches setFont when no onClick prop is provided', () => {
    const { store } = renderFonts({ current: 'm' });
    fireEvent.click(screen.getByTitle('Small Font'));
    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0]).toMatchObject({ type: 'SET_ACCESSIBILITY', font: 's' });
  });

  it('adds active class to the active button', () => {
    renderFonts({ current: 'm' });
    expect(screen.getByTitle('Medium Font')).toHaveClass('active');
    expect(screen.getByTitle('Large Font')).not.toHaveClass('active');
  });
});

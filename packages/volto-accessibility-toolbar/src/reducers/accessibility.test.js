import { accessibility } from './accessibility';
import { SET_ACCESSIBILITY } from '../constants/ActionTypes';

describe('accessibility reducer', () => {
  it('returns the initial state on unknown action', () => {
    const state = accessibility(undefined, {});
    expect(state).toEqual({ contrast: 'd', font: 'm' });
  });

  it('does not mutate state on unknown action', () => {
    const previous = { contrast: 'h', font: 'l' };
    const next = accessibility(previous, { type: 'UNKNOWN' });
    expect(next).toBe(previous);
  });

  it('updates contrast when SET_ACCESSIBILITY has contrast', () => {
    const state = accessibility(undefined, {
      type: SET_ACCESSIBILITY,
      contrast: 'h',
    });
    expect(state).toEqual({ contrast: 'h', font: 'm' });
  });

  it('updates font when SET_ACCESSIBILITY has font', () => {
    const state = accessibility(undefined, {
      type: SET_ACCESSIBILITY,
      font: 'l',
    });
    expect(state).toEqual({ contrast: 'd', font: 'l' });
  });

  it('updates both contrast and font', () => {
    const state = accessibility(undefined, {
      type: SET_ACCESSIBILITY,
      contrast: 'h',
      font: 's',
    });
    expect(state).toEqual({ contrast: 'h', font: 's' });
  });

  it('ignores undefined contrast (does not overwrite existing)', () => {
    const prev = { contrast: 'h', font: 'l' };
    const state = accessibility(prev, {
      type: SET_ACCESSIBILITY,
      font: 's',
    });
    expect(state.contrast).toBe('h');
    expect(state.font).toBe('s');
  });

  it('does not mutate the previous state', () => {
    const prev = { contrast: 'd', font: 'm' };
    const frozen = Object.freeze(prev);
    expect(() =>
      accessibility(frozen, { type: SET_ACCESSIBILITY, contrast: 'h' }),
    ).not.toThrow();
  });
});

import { SET_ACCESSIBILITY } from '../constants/ActionTypes';

const initialState = {
  contrast: 'd',
  font: 'm',
};

export const accessibility = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ACCESSIBILITY:
      return action;
    default:
      return state;
  }
};

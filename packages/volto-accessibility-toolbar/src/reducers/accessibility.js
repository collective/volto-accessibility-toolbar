import { SET_ACCESSIBILITY } from '../constants/ActionTypes';

const initialState = {
  contrast: 'd',
  font: 'm',
};

export const accessibility = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ACCESSIBILITY:
      return {
        ...state,
        ...(action.contrast !== undefined && { contrast: action.contrast }),
        ...(action.font !== undefined && { font: action.font }),
      };
    default:
      return state;
  }
};

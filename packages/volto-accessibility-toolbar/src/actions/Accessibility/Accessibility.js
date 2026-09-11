import { SET_ACCESSIBILITY } from '../../constants/ActionTypes';

export function setAccessibility(contrast, font) {
  return {
    type: SET_ACCESSIBILITY,
    ...Object.assign({}, { contrast: contrast, font: font }),
  };
}

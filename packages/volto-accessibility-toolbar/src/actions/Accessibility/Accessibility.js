import { SET_ACCESSIBILITY } from '../../constants/ActionTypes';

export function setAccessibility(high_contrast, font) {
  return {
    type: SET_ACCESSIBILITY,
    high_contrast,
    font,
  };
}

export function setFont(font) {
  return {
    type: SET_ACCESSIBILITY,
    font,
  };
}

export function setHighContrast(high_contrast) {
  return {
    type: SET_ACCESSIBILITY,
    contrast: high_contrast,
  };
}

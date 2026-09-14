import { SET_ACCESSIBILITY } from '../../constants/ActionTypes';

export function setAccessibility(contrast, font) {
  return {
    type: SET_ACCESSIBILITY,
    contrast,
    font,
  };
}

export function setFont(font) {
  return {
    type: SET_ACCESSIBILITY,
    font,
  };
}

export function setContrast(contrast) {
  return {
    type: SET_ACCESSIBILITY,
    contrast,
  };
}

import {
  setAccessibility,
  setFont,
  setHighContrast,
} from './Accessibility';
import { SET_ACCESSIBILITY } from '../../constants/ActionTypes';

describe('Accessibility action creators', () => {
  describe('setAccessibility', () => {
    it('returns correct type and payload', () => {
      expect(setAccessibility('h', 'l')).toEqual({
        type: SET_ACCESSIBILITY,
        high_contrast: 'h',
        font: 'l',
      });
    });

    it('returns default values when called without arguments', () => {
      const action = setAccessibility();
      expect(action.type).toBe(SET_ACCESSIBILITY);
      expect(action.high_contrast).toBeUndefined();
      expect(action.font).toBeUndefined();
    });
  });

  describe('setFont', () => {
    it('returns correct type and font payload', () => {
      expect(setFont('s')).toEqual({
        type: SET_ACCESSIBILITY,
        font: 's',
      });
    });

    it('works with all font values', () => {
      ['l', 'm', 's'].forEach((font) => {
        expect(setFont(font).font).toBe(font);
        expect(setFont(font).type).toBe(SET_ACCESSIBILITY);
      });
    });
  });

  describe('setHighContrast', () => {
    it('returns correct type and contrast payload', () => {
      expect(setHighContrast('h')).toEqual({
        type: SET_ACCESSIBILITY,
        contrast: 'h',
      });
    });

    it('works with disabled contrast value', () => {
      expect(setHighContrast('d')).toEqual({
        type: SET_ACCESSIBILITY,
        contrast: 'd',
      });
    });
  });
});

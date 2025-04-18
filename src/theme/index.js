// @ts-check
import { Platform } from 'react-native';
import typography from './typography';
import sizes from './sizes';
import colors from './colors';

/**
 * Check if the platform is iOS.
 * @returns {boolean}
 */
const isIos = () => {
  return Platform.OS === 'ios';
};

/**
 * @typedef {Object} Theme
 * @property {typeof import('./sizes').default} sizes
 * @property {typeof import('./typography').default} typography
 * @property {typeof import('./colors').default} colors
 * @property {() => boolean} isIos
 */

/** @type {Theme} */
const theme = {
  sizes,
  typography,
  isIos,
  colors,
};

export { theme };
export default theme;

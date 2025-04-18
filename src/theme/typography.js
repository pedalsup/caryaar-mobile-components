// @ts-check

/**
 * Defines standard font weights.
 * @typedef {Object} FontWeights
 * @property {'400'} normal
 * @property {'600'} semibold
 * @property {'500'} medium
 * @property {'700'} bold
 * @property {'300'} light
 * @property {'100'} thin
 * @property {'900'} black
 * @property {'200'} extraLight
 * @property {'800'} extraBold
 * @property {'400'} regular
 */

/** @type {FontWeights} */
const fontWeights = {
  normal: '400',
  semibold: '600',
  medium: '500',
  bold: '700',
  light: '300',
  thin: '100',
  black: '900',
  extraLight: '200',
  extraBold: '800',
  regular: '400',
};

/**
 * Defines available font families.
 * @typedef {Object} Fonts
 * @property {string} hankenGroteskBlack
 * @property {string} hankenGroteskBold
 * @property {string} hankenGroteskExtraBold
 * @property {string} hankenGroteskExtraLight
 * @property {string} hankenGroteskLight
 * @property {string} hankenGroteskMedium
 * @property {string} hankenGroteskRegular
 * @property {string} hankenGroteskSemiBold
 * @property {string} hankenGroteskThin
 */

/** @type {Fonts} */
const fonts = {
  hankenGroteskBlack: 'HankenGrotesk-Black',
  hankenGroteskBold: 'HankenGrotesk-Bold',
  hankenGroteskExtraBold: 'HankenGrotesk-ExtraBold',
  hankenGroteskExtraLight: 'HankenGrotesk-ExtraLight',
  hankenGroteskLight: 'HankenGrotesk-Light',
  hankenGroteskMedium: 'HankenGrotesk-Medium',
  hankenGroteskRegular: 'HankenGrotesk-Regular',
  hankenGroteskSemiBold: 'HankenGrotesk-SemiBold',
  hankenGroteskThin: 'HankenGrotesk-Thin',
};

/**
 * Defines standard line heights for typography.
 * @typedef {Object} LineHeights
 * @property {number} h1
 * @property {number} h2
 * @property {number} h3
 * @property {number} body
 * @property {number} small
 * @property {number} caption
 * @property {number} button
 */

/** @type {LineHeights} */
const lineHeights = {
  h1: 40,
  h2: 32,
  h3: 28,
  body: 24,
  small: 20,
  caption: 16,
  button: 20,
};

/**
 * Defines font sizes for various text styles.
 * @typedef {Object} FontSizes
 * @property {number} h1
 * @property {number} h2
 * @property {number} h3
 * @property {number} h4
 * @property {number} body
 * @property {number} small
 * @property {number} caption
 * @property {number} button
 */

/** @type {FontSizes} */
const fontSizes = {
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 18,
  body: 16,
  small: 14,
  caption: 12,
  button: 16,
};

/**
 * Defines complete font style objects combining fontFamily and fontWeight.
 * @typedef {Object<string, { fontFamily: string, fontWeight: string }>} FontStyles
 */

/** @type {FontStyles} */
const fontStyles = {
  hankenGroteskBlack: {
    fontFamily: fonts.hankenGroteskBlack,
    fontWeight: fontWeights.black,
  },
  hankenGroteskBold: {
    fontFamily: fonts.hankenGroteskBold,
    fontWeight: fontWeights.bold,
  },
  hankenGroteskExtraBold: {
    fontFamily: fonts.hankenGroteskExtraBold,
    fontWeight: fontWeights.extraBold,
  },
  hankenGroteskExtraLight: {
    fontFamily: fonts.hankenGroteskExtraLight,
    fontWeight: fontWeights.extraLight,
  },
  hankenGroteskLight: {
    fontFamily: fonts.hankenGroteskLight,
    fontWeight: fontWeights.light,
  },
  hankenGroteskMedium: {
    fontFamily: fonts.hankenGroteskMedium,
    fontWeight: fontWeights.medium,
  },
  hankenGroteskRegular: {
    fontFamily: fonts.hankenGroteskRegular,
    fontWeight: fontWeights.regular,
  },
  hankenGroteskSemiBold: {
    fontFamily: fonts.hankenGroteskSemiBold,
    fontWeight: fontWeights.semibold,
  },
  hankenGroteskThin: {
    fontFamily: fonts.hankenGroteskThin,
    fontWeight: fontWeights.thin,
  },
};

/**
 * Typography system containing font weights, font families, sizes, line heights, and style combinations.
 * @typedef {Object} Typography
 * @property {FontWeights} fontWeights
 * @property {Fonts} fonts
 * @property {LineHeights} lineHeights
 * @property {FontSizes} fontSizes
 * @property {FontStyles} fontStyles
 */

/** @type {Typography} */
const typography = {
  fontWeights,
  fonts,
  lineHeights,
  fontSizes,
  fontStyles,
};

export default typography;

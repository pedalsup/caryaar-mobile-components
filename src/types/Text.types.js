import { TextStyle } from "react-native";

/**
 * @typedef {'helper-text' | 'body-text' | 'large-header' | 'label' | 'input' | 'status' | 'caption'} TextType
 */

/**
 * @typedef {object} ITextProps
 * @property {string} [color]
 * @property {number} [size]
 * @property {TextStyle['fontWeight']} [weight]
 * @property {string} [fontFamily]
 * @property {React.ReactNode} [children]
 * @property {TextType} [type]
 * @property {import('react-native').StyleProp<TextStyle>} [style]
 * @property {number} [lineHeight]
 * @property {TextStyle['textAlign']} [textAlign]
 * @property {number} [margin]
 * @property {number} [numberOfLines]
 * @property {'head' | 'middle' | 'tail' | 'clip'} [ellipsizeMode]
 * @property {boolean} [adjustsFontSizeToFit]
 * @property {boolean} [hankenGroteskBlack]
 * @property {boolean} [hankenGroteskBold]
 * @property {boolean} [hankenGroteskExtraBold]
 * @property {boolean} [hankenGroteskExtraLight]
 * @property {boolean} [hankenGroteskLight]
 * @property {boolean} [hankenGroteskMedium]
 * @property {boolean} [hankenGroteskRegular]
 * @property {boolean} [hankenGroteskSemiBold]
 * @property {boolean} [hankenGroteskThin]
 * @property {boolean} [poppinsLight]
 */

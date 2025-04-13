// @ts-check
import React from "react";
import { Text as IText } from "react-native";
import { theme } from "../theme";
import {
  computeFontFamily,
  computeFontLineHeight,
  computeFontSize,
  computeFontWeight,
} from "./helper";
import { styles } from "../styles/Text.style";
import "../types/Text.types"; // ⬅️ This is key for loading the typedefs

/**
 * @param {ITextProps} props
 */
const Text = ({
  color,
  size,
  weight,
  fontFamily,
  children,
  type,
  style,
  lineHeight,
  textAlign,
  margin,
  numberOfLines,
  ellipsizeMode,
  adjustsFontSizeToFit,
  hankenGroteskBlack,
  hankenGroteskBold,
  hankenGroteskExtraBold,
  hankenGroteskExtraLight,
  hankenGroteskLight,
  hankenGroteskMedium,
  hankenGroteskRegular,
  hankenGroteskSemiBold,
  hankenGroteskThin,
  poppinsLight,
  ...rest
}) => {
  const isValidJSX = React.isValidElement(children);
  const computedFontSize = computeFontSize(size);
  const computedFontFamily = computeFontFamily(fontFamily);
  const computedFontWeight = computeFontWeight(weight);
  const computeLineHeightVal = computeFontLineHeight(lineHeight);

  const getTextComputedStyles = (type) => {
    switch (type) {
      case "helper-text":
        return styles.helperText;
      case "body-text":
        return styles.bodyText;
      case "large-header":
        return styles.largeHeader;
      case "label":
        return styles.label;
      case "input":
        return styles.input;
      case "status":
        return styles.status;
      case "caption":
        return styles.captionText;
      default:
        return styles.bodyText;
    }
  };

  const getAdditionalComputedStyles = (size, weight, color, fontFamily) => {
    const additionalStyles = {};
    if (size) additionalStyles.fontSize = size;
    if (weight) additionalStyles.fontWeight = weight;
    if (color) additionalStyles.color = color;
    if (fontFamily) additionalStyles.fontFamily = fontFamily;
    return additionalStyles;
  };

  const computedStyles = getTextComputedStyles(type);

  const defaultTextStyle = {
    fontFamily:
      computedFontFamily ?? theme.typography.fonts.hankenGroteskRegular,
    fontSize: computedFontSize ?? theme.typography.fontSizes.body,
    color: color ?? theme.colors.textPrimary,
    fontWeight: computedFontWeight,
    lineHeight: computeLineHeightVal,
    textAlign,
    margin: margin ?? 0,
  };

  const additionalComputedStyles = getAdditionalComputedStyles(
    computedFontSize,
    computedFontWeight,
    color,
    computedFontFamily
  );

  return (
    <>
      {children && isValidJSX ? (
        children
      ) : children !== undefined &&
        children !== null &&
        (typeof children === "string"
          ? children.trim() !== ""
          : children !== "") ? (
        <IText
          {...rest}
          numberOfLines={numberOfLines}
          ellipsizeMode={ellipsizeMode}
          adjustsFontSizeToFit={adjustsFontSizeToFit}
          style={[
            defaultTextStyle,
            computedStyles,
            additionalComputedStyles,
            hankenGroteskBlack &&
              theme.typography.fontStyles.hankenGroteskBlack,
            hankenGroteskExtraBold &&
              theme.typography.fontStyles.hankenGroteskExtraBold,
            hankenGroteskExtraLight &&
              theme.typography.fontStyles.hankenGroteskExtraLight,
            hankenGroteskLight &&
              theme.typography.fontStyles.hankenGroteskLight,
            hankenGroteskMedium &&
              theme.typography.fontStyles.hankenGroteskMedium,
            hankenGroteskRegular &&
              theme.typography.fontStyles.hankenGroteskRegular,
            hankenGroteskSemiBold &&
              theme.typography.fontStyles.hankenGroteskSemiBold,
            hankenGroteskThin && theme.typography.fontStyles.hankenGroteskThin,
            hankenGroteskBold && theme.typography.fontStyles.hankenGroteskBold,
            style,
          ]}
        >
          {children}
        </IText>
      ) : null}
    </>
  );
};

export default Text;

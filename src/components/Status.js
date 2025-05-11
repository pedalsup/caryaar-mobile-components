/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Image, View } from "react-native";
import { images } from "../assets";
import theme from "../theme";
import Text from "./Text";

const getIconInfo = (status) => {
  switch (status) {
    case "success":
      return {
        icon: images.everything_ok,
        color: theme.colors.darkGreen,
        bgColor: theme.colors.lightestGreen,
      };
    case "error":
      return {
        icon: images.critical_alert,
        color: theme.colors.error,
        bgColor: theme.colors.lightestRed,
      };
    case "warning":
      return {
        icon: images.warning,
        color: theme.colors.warning,
        bgColor: theme.colors.lightestOrange,
      };
    case "info":
      return {
        icon: images.icon_info,
        color: theme.colors.darkBlue,
        bgColor: theme.colors.white,
      };
    default:
      return {
        icon: images.icon_info,
        color: theme.colors.textPrimary,
        bgColor: theme.colors.white,
      };
  }
};

const Status = ({
  message,
  type = "success",
  isTitle = false,
  containerStyle,
  width,
  mainIcon,
  messageStyle,
  isLeftIconVisible = true,
  isBgVisible = true,
  isBorderVisible = false,
  borderColor,
  iconSize = 22,
}) => {
  const { color, icon, bgColor, tintColor } = getIconInfo(type);
  const containerWidth =
    width && typeof width === "string" && width?.includes("%") ? width : width;

  const defaultCardStyle = {
    backgroundColor: isBgVisible ? bgColor : "transparent",
    paddingVertical: isBgVisible || isBorderVisible ? 12 : 0,
    paddingHorizontal: 10,
    borderColor: isBorderVisible && borderColor ? borderColor : color,
    borderWidth: isBorderVisible ? 1 : 0,
  };

  const messageStyles = {
    color: isBorderVisible ? theme.colors.textDark : color,
    ...messageStyle,
  };

  return (
    <View
      flexDirection="row"
      borderRadius={12}
      maxWidth={containerWidth}
      {...defaultCardStyle}
      {...containerStyle}
    >
      <View style={{ flex: 9.2, flexDirection: "row" }}>
        {isLeftIconVisible && (
          <Image
            resizeMode="contain"
            source={icon}
            style={{ height: iconSize, width: iconSize }}
          />
        )}
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Text
            hankenGroteskBold
            size={"body"}
            style={messageStyles}
            lineHeight={"small"}
          >
            {message}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Status;

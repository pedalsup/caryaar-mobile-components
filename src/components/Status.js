/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View, Image } from "react-native";
import Text from "./Text";
import { images } from "../assets";
import theme from "../theme";

const getIconInfo = (status) => {
  switch (status) {
    case "success":
      return {
        icon: images.successCheck,
        color: theme.colors.darkGreen,
        bgColor: theme.colors.lightestGreen,
      };
    case "error":
      return {
        icon: images.infoStatus,
        color: theme.colors.error,
        bgColor: theme.colors.lightestRed,
      };
    case "warning":
      return {
        icon: images.infoStatus,
        color: theme.colors.warning,
        bgColor: theme.colors.lightestOrange,
      };
    case "info":
      return {
        icon: images.infoStatus,
        color: theme.colors.darkBlue,
        bgColor: theme.colors.lightBlue,
        tintColor: theme.colors.darkBlue,
      };
    default:
      return {
        icon: images.infoStatus,
        color: theme.colors.textDark,
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
}) => {
  const { color, icon, bgColor, tintColor } = getIconInfo(type);
  console.log({ tintColor });
  const containerWidth =
    width && typeof width === "string" && width?.includes("%") ? width : width;

  const defaultCardStyle = {
    backgroundColor: isBgVisible ? bgColor : "transparent",
    paddingVertical: isBgVisible || isBorderVisible ? 10 : 0,
    paddingHorizontal: 10,
    borderColor: isBorderVisible && borderColor ? borderColor : color,
    borderWidth: isBorderVisible ? 1 : 0,
  };

  console.log({ containerStyle });

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
            style={{ height: 20, width: 20 }}
          />
        )}
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Text
            hankenGroteskSemiBold
            // size="small"
            // lineHeight={'small'}
            style={messageStyles}
          >
            {message}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Status;

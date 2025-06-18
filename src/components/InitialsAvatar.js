import { Text } from "./";
import React from "react";
import { StyleSheet, View } from "react-native";

const InitialsAvatar = ({
  name,
  size = 42,
  fontSize = "small",
  themeColor = "#1D95F0",
  avatarWrapperStyle = {},
  textStyle,
}) => {
  const getInitials = (value) =>
    value
      ?.trim()
      ?.split(/\s+/)
      ?.slice(0, 2)
      ?.map((word) => word[0])
      ?.join("")
      ?.toUpperCase() || "";
  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2 },
        avatarWrapperStyle,
      ]}
    >
      <Text
        size={fontSize}
        color={themeColor}
        hankenGroteskBold
        style={textStyle}
      >
        {getInitials(name)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: "#1D95F020",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InitialsAvatar;

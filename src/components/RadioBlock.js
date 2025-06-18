import React from "react";
import {
  Image,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  StyleProp,
} from "react-native";
import { Pressable, Text } from ".";
import images from "../assets/images";
import theme from "../theme";

type RadioBlockProps = {
  label: string,
  isSelected?: boolean,
  onPress: () => void,
  wrapperStyle?: StyleProp<ViewStyle>,
  iconStyle?: StyleProp<ImageStyle>,
  selectedIcon?: any,
  unselectedIcon?: any,
  textProps?: React.ComponentProps<typeof Text>,
};

const RadioBlock = ({
  label,
  isSelected = false,
  onPress,
  wrapperStyle,
  iconStyle,
  selectedIcon = images.radio_selected,
  unselectedIcon = images.radio_unselected,
  textProps,
  isDisabled,
}: RadioBlockProps) => {
  return (
    <Pressable
      disabled={isDisabled}
      style={[
        styles.block,
        isSelected && styles.blockSelected,
        wrapperStyle,
        isDisabled && {
          borderColor: theme.colors.textSecondary,
          borderWidth: 1,
          opacity: 0.8,
        },
      ]}
      onPress={onPress}
    >
      <Image
        source={isSelected ? selectedIcon : unselectedIcon}
        style={[styles.radioIcon, iconStyle]}
      />
      <Text
        size="small"
        hankenGroteskMedium={isSelected}
        color={isSelected ? theme.colors.black : theme.colors.textSecondary}
        {...textProps}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.sizes.borderRadius.md,
    backgroundColor: theme.colors.lightGray,
  },
  blockSelected: {
    borderColor: theme.colors.primary,
  },
  radioIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
});

export default React.memo(RadioBlock);

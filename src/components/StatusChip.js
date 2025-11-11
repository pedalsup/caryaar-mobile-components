import { Pressable, Text } from "./";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import images from "../assets/images";

const StatusChip = ({ label, onRemove, style = {}, textStyle = {} }) => {
  return (
    <Pressable
      onPress={onRemove}
      style={[styles.chip, style]}
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
    >
      <Text hankenGroteskBold size={"small"} style={[textStyle]}>
        {label}
      </Text>
      {/* <Pressable onPress={()=> console.log("---")}  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}> */}
      <Image source={images.icFilterClose} style={styles.closeIcon} />
      {/* </Pressable> */}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    backgroundColor: "white",
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 12,
    gap: 8,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  chipText: {
    fontSize: 14,
  },
  closeIcon: {
    height: 16,
    width: 16,
  },
});

export default StatusChip;

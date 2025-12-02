import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const FullLoader = ({
  visible = false,
  indicatorColor = "#fff",
  overlayColor = "rgba(0,0,0,0.1)",
  size = "large",
  wrapperStyle = {},
  loaderBoxStyle = {},
}) => {
  if (!visible) return null;

  return (
    <View
      style={[styles.overlay, { backgroundColor: overlayColor }, wrapperStyle]}
    >
      <View style={[styles.loaderBox, loaderBoxStyle]}>
        <ActivityIndicator size={size} color={indicatorColor} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    height: "100%",
    width: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  loaderBox: {
    height: 80,
    width: 80,
    borderRadius: 10,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FullLoader;

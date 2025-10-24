import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "./Button/Button";
import theme from "../theme";

const FormFooterButtons = ({
  primaryButtonLabel,
  onPressPrimaryButton,
  primaryButtonStyle,
  secondaryButtonLabel,
  onPressSecondaryButton,
  secondaryButtonStyle,
  extraPropPrimaryButton,
  extraPropSecondaryButton,
  hideSecondaryButton,
  direction = "row",
}) => {
  const isRow = direction === "row";

  const iWrapperStyle = StyleSheet.flatten([isRow && styles.buttonRow]);

  const iButtonStyle = StyleSheet.flatten([
    isRow && styles.button,
    !isRow && { flex: 0, marginBottom: theme.sizes.spacing.md_lg },
  ]);

  return (
    <View style={iWrapperStyle}>
      <Button
        label={primaryButtonLabel}
        variant={isRow ? "link" : "solid"}
        buttonWrapper={[iButtonStyle, primaryButtonStyle]}
        onPress={onPressPrimaryButton}
        hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        {...extraPropPrimaryButton}
      />
      {!hideSecondaryButton && (
        <Button
          variant={!isRow ? "link" : "solid"}
          label={secondaryButtonLabel}
          style={[iButtonStyle, secondaryButtonStyle]}
          buttonWrapper={styles.button}
          onPress={onPressSecondaryButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          {...extraPropSecondaryButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    // justifyContent: "space-between",
    gap: 8,
  },
  button: {
    flex: 1,
    // marginHorizontal: 5, // Small spacing between buttons
  },
});

export default FormFooterButtons;

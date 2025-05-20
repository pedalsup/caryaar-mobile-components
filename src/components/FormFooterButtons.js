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

  const iWrapperStyle = StyleSheet.flatten([
    isRow && styles.buttonRow,
    { marginTop: theme.sizes.spacing.xl },
  ]);

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
        {...extraPropPrimaryButton}
      />
      {!hideSecondaryButton && (
        <Button
          variant={!isRow ? "link" : "solid"}
          label={secondaryButtonLabel}
          style={[iButtonStyle, secondaryButtonStyle]}
          buttonWrapper={styles.button}
          onPress={onPressSecondaryButton}
          {...extraPropSecondaryButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 4, // Small spacing between buttons
  },
});

export default FormFooterButtons;

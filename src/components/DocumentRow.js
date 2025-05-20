import { Pressable, Spacing, Text } from "./";
import React from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import theme from "../theme";
import { images } from "../assets";

/**
 * A reusable row component to display a document-related label and an action
 * (like upload or view), optionally with a loading spinner or error state.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.label - Main label on the left
 * @param {string} props.actionLabel - Action label (e.g., "Upload", "View")
 * @param {boolean} [props.isLink=false] - Whether the action label should be styled as a link
 * @param {boolean} [props.showError=false] - Show error icon and color
 * @param {Function} [props.onPress] - Callback when action is pressed
 * @param {boolean} [props.isLoading=false] - Show loading spinner next to action
 * @param {boolean} [props.disabled=false] - Disable the pressable
 */
const DocumentRow = ({
  label,
  actionLabel,
  isLink = false,
  showError = false,
  onPress,
  isLoading = false,
  disabled = false,
}) => {
  const actionColor = isLoading
    ? theme.colors.placeHolder
    : theme.colors.primary;

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Text
          size="small"
          hankenGroteskMedium
          color={showError ? theme.colors.error : theme.colors.primaryBlack}
        >
          {label}
        </Text>
        {showError && (
          <Image source={images.infoStatus} style={styles.errorIcon} />
        )}
      </View>

      <View style={styles.right}>
        <Pressable onPress={onPress} disabled={isLoading || disabled}>
          <Text
            color={actionColor}
            type={isLink ? "link" : "helper-text"}
            hankenGroteskSemiBold
          >
            {actionLabel}
          </Text>
        </Pressable>
        {isLoading && (
          <>
            <Spacing direction="y" />
            <ActivityIndicator size="small" color={theme.colors.primary} />
          </>
        )}
      </View>
    </View>
  );
};

export default DocumentRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  errorIcon: {
    width: 16,
    height: 16,
    marginLeft: 6,
  },
});

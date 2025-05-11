import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import images from "../assets/images";
import theme from "../theme";
import Text from "./Text";

const steps = [
  { label: "Business\nDetails", stepId: 1 },
  { label: "Business\nLocation", stepId: 2 },
  { label: "Required\nDocuments", stepId: 3 },
  { label: "Banking\nDetails", stepId: 4 },
];

const StepTracker = ({
  errorSteps = [],
  showImages = [],
  selectedId,
  selectedColor = theme.colors.black,
  errorColor = "#FF3B30",
  imageLabelColor = "#4CAF50",
  defaultColor = theme.colors.textSecondary,
  onStepPress,
  disableStepPress = true,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {steps.map((step, index) => {
          const isLastStep = index === steps.length - 1;
          const isError = errorSteps.includes(step.stepId);
          const showImage = showImages.includes(step.stepId);
          const _selectedID = step.stepId === selectedId;

          let labelColor = defaultColor;
          let fontStyle;
          if (showImage) {
            labelColor = isError ? errorColor : imageLabelColor;
            fontStyle = theme.typography.fontStyles.hankenGroteskSemiBold;
          } else if (_selectedID) {
            labelColor = selectedColor;
            fontStyle = theme.typography.fontStyles.hankenGroteskSemiBold;
          } else if (isError) {
            labelColor = errorColor;
            fontStyle = theme.typography.fontStyles.hankenGroteskBold;
          }

          return (
            <TouchableOpacity
              disabled={disableStepPress}
              onPress={() => onStepPress?.(step.stepId)}
              key={index}
              style={[styles.stepItem, isLastStep && styles.noFlex]}
            >
              <View style={styles.iconRow}>
                {showImage ? (
                  <Image
                    source={isError ? images.infoStatus : images.successCheck}
                    style={styles.iconImage}
                    resizeMode="contain"
                  />
                ) : (
                  <View
                    style={[
                      styles.circle,
                      {
                        backgroundColor: _selectedID
                          ? theme.colors.primary
                          : "#F2F2F2",
                      },
                    ]}
                  >
                    <Text
                      hankenGroteskSemiBold={true}
                      type={"caption"}
                      color={_selectedID ? theme.colors.white : defaultColor}
                    >
                      {step.stepId}
                    </Text>
                  </View>
                )}
                {!isLastStep && <View style={styles.dashLine} />}
              </View>

              <Text
                size={"small"}
                style={[styles.label, { color: labelColor }, fontStyle]}
              >
                {step.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  container: {
    flexDirection: "row",
    paddingRight: 0,
    marginRight: 0,
  },
  stepItem: {
    flex: 1,
  },
  noFlex: {
    flex: 0,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconImage: {
    height: 24,
    width: 24,
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dashLine: {
    height: 1,
    flex: 1,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 5,
  },
  label: {
    marginTop: 8,
    lineHeight: 16,
  },
});

export default StepTracker;

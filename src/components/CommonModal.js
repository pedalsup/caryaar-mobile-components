import React from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import Modal from "react-native-modal";
import images from "../assets/images";
import { Button, Pressable, Spacing, Text } from "./";

const screenHeight = Dimensions.get("window").height;

/**
 * @typedef {Object} CommonModalProps
 * @property {boolean} isVisible
 * @property {string} [title]
 * @property {boolean} [showCloseIcon]
 * @property {React.ReactNode} [children]
 * @property {boolean} [isPrimaryButtonVisible]
 * @property {string} [primaryButtonLabel]
 * @property {function} [onPressPrimaryButton]
 * @property {object} [modalContentStyle]
 * @property {boolean} [isScrollableContent]
 * @property {object} [modalContainerStyle]
 * @property {function} [onModalHide]
 * @property {boolean} [isTextCenter]
 * @property {boolean} [showSecondaryButton]
 * @property {string} [secondaryButtonText]
 * @property {function} [onSecondaryPress]
 * @property {number} [modalHeight] - Custom modal height (in pixels)
 * @property {boolean} [enableSwipe] - Enable swipe to dismiss
 * @param {Object} [rest] - Additional props passed to the Modal

 */

/**
 * CommonModal - Customizable bottom sheet modal
 *
 * @param {CommonModalProps} props
 */
const CommonModal = ({
  isVisible,
  title = "",
  showCloseIcon = true,
  children,
  isPrimaryButtonVisible = false,
  primaryButtonLabel = "Submit",
  onPressPrimaryButton,
  modalContentStyle,
  isScrollableContent,
  modalContainerStyle,
  onModalHide = () => {},
  isTextCenter = true,
  showSecondaryButton,
  secondaryButtonText,
  onSecondaryPress,
  modalHeight, // new prop
  enableSwipe = false, // new prop,
  ...rest
}) => {
  const iModalContentStyle = StyleSheet.flatten([
    styles.modalContainer,
    { maxHeight: modalHeight || screenHeight * 0.7 }, // Apply custom height
    modalContentStyle,
  ]);
  const iModalContainerStyle = StyleSheet.flatten([
    styles.container,
    modalContainerStyle,
  ]);

  const additionHeight =
    Platform.OS === "ios" ? 0 : StatusBar.currentHeight ?? 0;

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onModalHide}
      onBackButtonPress={onModalHide}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      swipeDirection={enableSwipe ? "down" : null} // swipe to dismiss
      onSwipeComplete={onModalHide}
      backdropTransitionOutTiming={1}
      style={styles.modal}
      {...rest}
    >
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.select({
          ios: 0,
          android: -additionHeight,
        })}
        style={styles.keyboardAvoidingView}
      >
        <View style={iModalContainerStyle}>
          {showCloseIcon && (
            <Pressable onPress={onModalHide} style={styles.closeBtn}>
              <Image
                source={images.closeRound}
                style={styles.closeImg}
                resizeMode="contain"
              />
            </Pressable>
          )}
          <View style={iModalContentStyle}>
            {title && (
              <>
                <Text
                  size={"h3"}
                  hankenGroteskBold={true}
                  textAlign={isTextCenter ? "center" : "left"}
                >
                  {title}
                </Text>
                <Spacing size="sm" />
              </>
            )}
            {isScrollableContent ? (
              <ScrollView bounces={false}>{children}</ScrollView>
            ) : (
              children
            )}
            {isPrimaryButtonVisible && (
              <>
                {/* <Spacing size="md_lg" /> */}
                <Button
                  label={primaryButtonLabel}
                  onPress={onPressPrimaryButton}
                />
                <Spacing size="md" />
              </>
            )}
            {showSecondaryButton && (
              <>
                <Spacing size="xs" />
                <Button
                  label={secondaryButtonText}
                  variant="link"
                  onPress={onSecondaryPress}
                />
                <Spacing size="md" />
              </>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CommonModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  closeBtn: {
    top: -10,
    alignSelf: "center",
    padding: 6,
    zIndex: 1,
  },
  closeImg: {
    height: 40,
    width: 40,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  modalContainer: {
    padding: 24,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
  },
});

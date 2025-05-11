import React from "react";
import Toast, {
  ToastProps,
  BaseToast,
  SuccessToast,
  ErrorToast,
  InfoToast,
  BaseToastProps,
  ToastPosition,
} from "react-native-toast-message";
import { Platform, Dimensions } from "react-native";
import { Status } from "./";
import theme from "../theme";

const width = Dimensions.get("window").width;
/* istanbul ignore next */
const baseStyles = {
  borderRadius: "rounded",
  borderBottomLeftRadius: 8,
  borderTopLeftRadius: 8,
  borderLeftWidth: 8,
  borderWidth: 1,
  width: "100%",
  paddingHorizontal: 10,
  ...(Platform.OS === "web" && {
    maxWidth: width >= 420 ? 420 : "calc(100% - 20px)",
  }),
};

const toastConfig = {
  success: ({ text1, props }: { text1: string; props: any }) => (
    <Status
      isTitle
      message={text1}
      isRightArrowVisible={false}
      type={"success"}
      containerStyle={{
        ...baseStyles,
        borderColor: theme.colors.darkGreen,
      }}
      {...props}
    />
  ),
  info: ({ text1, props }: { text1: string; props: any }) => (
    <Status
      isTitle
      message={text1}
      isRightArrowVisible={false}
      type={"info"}
      containerStyle={{ ...baseStyles, borderColor: theme.colors.darkBlue }}
      {...props}
    />
  ),
  warning: ({ text1, props }: { text1: string; props: any }) => (
    <Status
      isTitle
      message={text1}
      isRightArrowVisible={false}
      type={"warning"}
      containerStyle={{ ...baseStyles, borderColor: theme.colors.warning }}
      {...props}
    />
  ),
  error: ({ text1, props }: { text1: string; props: any }) => (
    <Status
      isTitle
      message={text1}
      isRightArrowVisible={false}
      type={"error"}
      containerStyle={{ ...baseStyles, borderColor: theme.colors.error }}
      {...props}
    />
  ),
};

export {
  Toast,
  toastConfig,
  BaseToast,
  SuccessToast,
  ErrorToast,
  InfoToast,
  ToastProps,
  BaseToastProps,
  ToastPosition,
};

import React, { useRef, useState /*, useEffect*/ } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Keyboard /*, Platform*/,
} from "react-native";
import typography from "../theme/typography";
// import SmsRetriever from 'react-native-sms-retriever'; // Uncomment when enabling autofill
// import Clipboard from '@react-native-community/clipboard'; // Uncomment for iOS autofill

const OTPVerification = ({
  pinCount = 4,
  onOtpComplete,
  containerStyle,
  inputStyle,
  focusedInputStyle,
  secureTextEntry = false,
}) => {
  const [otp, setOtp] = useState(new Array(pinCount).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRefs = useRef([]);

  // Uncomment to enable SMS autofill (Android) or clipboard check (iOS)
  /*
  useEffect(() => {
    startSmsListener();
    checkClipboardForOtp();
  }, []);

  const startSmsListener = async () => {
    try {
      await SmsRetriever.startSmsRetriever();
      const message = await SmsRetriever.requestOneTimeConsent();
      const extractedOtp = extractOtpFromMessage(message);
      if (extractedOtp) fillOtpFields(extractedOtp);
    } catch (error) {
      console.log('SMS Retriever error:', error);
    }
  };

  const checkClipboardForOtp = async () => {
    if (Platform.OS === 'ios') {
      const clipboardContent = await Clipboard.getString();
      const extractedOtp = extractOtpFromMessage(clipboardContent);
      if (extractedOtp) fillOtpFields(extractedOtp);
    }
  };

  const extractOtpFromMessage = message => {
    const otpRegex = /\b\d{4,6}\b/;
    const match = message.match(otpRegex);
    return match ? match[0] : null;
  };

  const fillOtpFields = otpString => {
    if (otpString.length >= pinCount) {
      const otpArray = otpString.split('').slice(0, pinCount);
      setOtp(otpArray);
      onOtpComplete && onOtpComplete(otpArray.join(''));
      Keyboard.dismiss();
    }
  };
  */

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text ? text[text.length - 1] : "";
    setOtp(newOtp);

    if (text && index < pinCount - 1) {
      inputRefs.current[index + 1].focus();
    }

    const joinedOtp = newOtp.join("");
    onOtpComplete?.(joinedOtp);

    if (joinedOtp.length === pinCount && newOtp.every((char) => char !== "")) {
      Keyboard.dismiss();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && otp[index] === "") {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          style={[
            styles.otpInput,
            inputStyle,
            typography.fontStyles.hankenGroteskBold,
            focusedIndex === index && [styles.otpFocused, focusedInputStyle],
          ]}
          keyboardType="numeric"
          secureTextEntry
          maxLength={1}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(-1)}
          autoFocus={index === 0}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  otpInput: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "rgba(0, 0, 0, 0.12)",
    textAlign: "center",
    fontSize: typography.fontSizes.h2,
    marginRight: 15,
    backgroundColor: "#f9f9f9",
  },
  otpFocused: {
    // Optional: Add borderColor here if you want focused input highlighting
  },
});

export default OTPVerification;

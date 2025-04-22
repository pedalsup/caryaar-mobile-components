import React from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Button,
  DropdownModal,
  GroupWrapper,
  Input,
  Spacing,
} from "../../components";
import theme from "../../theme";
import images from "../../assets/images";

const BasicDetailsForm = ({
  businessType,
  onBusinessTypePress,
  onChangeBusinessName,
  onChangeYearsInBusiness,
  onChangeMonthlyCarSales,
  onChangeOwnerName,
  onChangeMobileNumber,
  onChangeEmail,
  handleNextPress,
  dropdownOptions,
  onSelectBusinessType,
  contentContainerStyle,
  buttonLabel,
  restInputProps = {},
}) => {
  const refs = {
    businessName: React.useRef(null),
    businessType: React.useRef(null),
    yearsInBusiness: React.useRef(null),
    monthlyCarSales: React.useRef(null),
    ownerName: React.useRef(null),
    mobileNumber: React.useRef(null),
    emailAddress: React.useRef(null),
    scrollRef: React.useRef(null),
  };

  const focusNext = (key) => {
    refs[key]?.current?.focus();
  };

  const scrollToInput = (key) => {
    if (refs.scrollRef?.current && refs[key]?.current) {
      refs.scrollRef.current.scrollToFocusedInput(refs[key].current, 250);
    }
  };

  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <KeyboardAwareScrollView
        contentContainerStyle={contentContainerStyle}
        ref={refs.scrollRef}
      >
        <GroupWrapper title="Basic Detail">
          <Input
            ref={refs.businessName}
            label="Business Name"
            isLeftIconVisible
            leftIconName={images.businessSuitcase}
            onChangeText={(text) => {
              onChangeBusinessName && onChangeBusinessName(text);
              scrollToInput("businessName");
            }}
            returnKeyType="next"
            onSubmitEditing={() => focusNext("yearsInBusiness")}
            {...(restInputProps.businessName || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs.businessType}
            label="Business Type"
            isRightIconVisible
            isAsDropdown
            isLeftIconVisible
            leftIconName={images.businessSuitcase}
            onPress={() => {
              setShowModal(true);
            }}
            value={businessType}
            placeholder="Select"
            returnKeyType="next"
            onSubmitEditing={() => focusNext("yearsInBusiness")}
            {...(restInputProps.businessType || {})}
          />
          <Spacing size="md" />
          <View style={styles.rowSpaceBetween}>
            <View style={styles.halfWidth}>
              <Input
                ref={refs.yearsInBusiness}
                placeholder=""
                isLeftIconVisible
                leftIconName={images.businessSuitcase}
                label="Years in Business"
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  onChangeYearsInBusiness && onChangeYearsInBusiness(text);
                  scrollToInput("yearsInBusiness");
                }}
                returnKeyType="next"
                onSubmitEditing={() => focusNext("monthlyCarSales")}
                {...(restInputProps.yearsInBusiness || {})}
              />
            </View>
            <View style={styles.halfWidth}>
              <Input
                ref={refs.monthlyCarSales}
                placeholder=""
                isLeftIconVisible
                leftIconName={images.businessSuitcase}
                label="Monthly Car Sales"
                keyboardType="decimal-pad"
                returnKeyType="next"
                onChangeText={(text) => {
                  onChangeMonthlyCarSales && onChangeMonthlyCarSales(text);
                  scrollToInput("monthlyCarSales");
                }}
                returnKeyType="next"
                onSubmitEditing={() => focusNext("ownerName")}
                {...(restInputProps.monthlyCarSales || {})}
              />
            </View>
          </View>
        </GroupWrapper>

        <Spacing size="lg" />
        <GroupWrapper title="Contact Detail">
          <Input
            ref={refs.ownerName}
            label="Owner Name"
            isLeftIconVisible
            leftIconName={images.user}
            onChangeText={(text) => {
              onChangeOwnerName && onChangeOwnerName(text);
              scrollToInput("ownerName");
            }}
            returnKeyType="next"
            onSubmitEditing={() => focusNext("mobileNumber")}
            {...(restInputProps.ownerName || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs.mobileNumber}
            label="Mobile Number"
            isLeftIconVisible
            leftIconName={images.callOutline}
            keyboardType="phone-pad"
            maxLength={10}
            onChangeText={(text) => {
              onChangeMobileNumber && onChangeMobileNumber(text);
              scrollToInput("mobileNumber");
            }}
            returnKeyType="next"
            onSubmitEditing={() => focusNext("emailAddress")}
            {...(restInputProps.mobileNumber || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs.emailAddress}
            label="Email"
            isLeftIconVisible
            leftIconName={images.email}
            keyboardType="email-address"
            onChangeText={(text) => {
              onChangeEmail && onChangeEmail(text);
              scrollToInput("emailAddress");
            }}
            returnKeyType="done"
            onSubmitEditing={handleNextPress}
            {...(restInputProps.emailAddress || {})}
          />
        </GroupWrapper>

        <Spacing size="xl" />
        <Button label={buttonLabel || "Next"} onPress={handleNextPress} />
      </KeyboardAwareScrollView>
      <DropdownModal
        visible={showModal}
        data={dropdownOptions}
        selectedItem={businessType}
        onSelect={(item, index) => {
          onSelectBusinessType && onSelectBusinessType(item, index);
        }}
        onClose={() => setShowModal(false)}
        title="Select Business Type"
      />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: theme.sizes.padding,
    flexGrow: 1,
    backgroundColor: theme.colors.background,
  },
  rowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },
});

export default BasicDetailsForm;

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
import { useFormRefs } from "./useFormRefs";

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
  const { refs, focusNext, scrollToInput } = useFormRefs([
    "businessName",
    "businessType",
    "yearsInBusiness",
    "monthlyCarSales",
    "ownerName",
    "mobileNumber",
    "emailAddress",
    "scrollRef",
  ]);

  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <KeyboardAwareScrollView
        contentContainerStyle={contentContainerStyle}
        ref={refs.scrollRef}
        extraHeight={100}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        keyboardOpeningTime={0}
      >
        <GroupWrapper title="Basic Detail">
          <Input
            ref={refs.businessName}
            label="Business Name"
            isLeftIconVisible
            leftIconName={images.businessSuitcase}
            onChangeText={(text) => {
              onChangeBusinessName && onChangeBusinessName(text);
            }}
            onFocus={() => scrollToInput("businessName")}
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
            onFocus={() => scrollToInput("businessType")}
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
                }}
                onFocus={() => scrollToInput("yearsInBusiness")}
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
                onChangeText={(text) => {
                  onChangeMonthlyCarSales && onChangeMonthlyCarSales(text);
                }}
                onFocus={() => scrollToInput("monthlyCarSales")}
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
            }}
            onFocus={() => scrollToInput("ownerName")}
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
            }}
            onFocus={() => scrollToInput("mobileNumber")}
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
            }}
            onFocus={() => scrollToInput("emailAddress")}
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
